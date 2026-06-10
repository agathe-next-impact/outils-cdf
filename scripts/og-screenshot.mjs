/**
 * Génère l'image OpenGraph (et Twitter) à partir d'une capture de la page d'accueil.
 *
 * 100 % local : démarre le serveur Next en production, capture via Edge/Chrome du
 * système (canal `msedge`/`chrome` de Playwright → AUCUN téléchargement de
 * navigateur), puis arrête le serveur. Le bandeau de consentement et le mode
 * sombre sont neutralisés avant la capture pour une image stable et propre.
 *
 * Prérequis : `npm run build` au préalable.
 *
 * Usage :
 *   npm run og                                   # accueil → app/opengraph-image.png
 *   npm run og -- --route /outils                # capture une autre route
 *   npm run og -- --base-url http://localhost:3000   # serveur déjà lancé
 *   npm run og -- --channel chrome               # forcer Chrome plutôt qu'Edge
 */
import { spawn } from "node:child_process";
import { copyFile, mkdir, stat } from "node:fs/promises";
import http from "node:http";
import net from "node:net";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const ROOT = process.cwd();
const VIEWPORT = { width: 1200, height: 630 };

function parseArgs(argv) {
  const a = {
    baseUrl: "",
    route: "/",
    out: "app/opengraph-image.png",
    twitter: "app/twitter-image.png",
    channel: "msedge",
    settle: 1200,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const k = argv[i];
    const v = argv[i + 1];
    if (k === "--base-url") (a.baseUrl = v), (i += 1);
    else if (k === "--route") (a.route = v), (i += 1);
    else if (k === "--out") (a.out = v), (i += 1);
    else if (k === "--twitter") (a.twitter = v), (i += 1);
    else if (k === "--channel") (a.channel = v), (i += 1);
    else if (k === "--settle") (a.settle = Number(v)), (i += 1);
  }
  return a;
}

function get(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        if ((res.statusCode ?? 500) >= 400) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        res.resume();
        res.on("end", resolve);
      })
      .on("error", reject);
  });
}

function freePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.unref();
    s.on("error", reject);
    s.listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

async function waitForServer(baseUrl, timeoutMs = 60000) {
  const start = Date.now();
  let lastError;
  while (Date.now() - start < timeoutMs) {
    try {
      await get(`${baseUrl}/robots.txt`);
      return;
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, 600));
    }
  }
  throw lastError ?? new Error(`Serveur indisponible : ${baseUrl}`);
}

async function startServer() {
  const port = await freePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(
    process.execPath,
    [nextBin, "start", "-H", "127.0.0.1", "-p", String(port)],
    { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"], windowsHide: true },
  );
  await waitForServer(baseUrl);
  return {
    baseUrl,
    close: () =>
      new Promise((resolve) => {
        child.once("exit", resolve);
        child.kill();
        setTimeout(resolve, 1500);
      }),
  };
}

async function launchBrowser(channel) {
  try {
    return await chromium.launch({ channel });
  } catch {
    // Repli : autre canal système, puis Chromium groupé s'il est installé.
    try {
      return await chromium.launch({ channel: channel === "msedge" ? "chrome" : "msedge" });
    } catch {
      return await chromium.launch();
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let owned = null;
  const baseUrl = args.baseUrl || (owned = await startServer()).baseUrl;
  const browser = await launchBrowser(args.channel);
  try {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2, // image nette (2400×1260)
      colorScheme: "light",
    });
    // Neutralise le bandeau RGPD et force le thème clair AVANT tout rendu.
    await context.addInitScript(() => {
      try {
        localStorage.setItem("p2p-analytics-consent", "denied");
        localStorage.setItem("theme", "light");
      } catch {
        /* stockage indisponible */
      }
    });
    const page = await context.newPage();
    const url = new URL(args.route, baseUrl).toString();
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await page.waitForTimeout(args.settle);

    const out = path.resolve(ROOT, args.out);
    await mkdir(path.dirname(out), { recursive: true });
    await page.screenshot({ path: out, type: "png", clip: { x: 0, y: 0, ...VIEWPORT } });
    const { size } = await stat(out);
    console.log(`OG      → ${path.relative(ROOT, out)} (${Math.round(size / 1024)} Ko)`);

    if (args.twitter) {
      const tw = path.resolve(ROOT, args.twitter);
      await copyFile(out, tw);
      console.log(`Twitter → ${path.relative(ROOT, tw)}`);
    }
  } finally {
    await browser.close();
    if (owned) await owned.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
