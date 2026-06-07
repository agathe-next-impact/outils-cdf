import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Plusieurs lockfiles existent dans C:\dev ; on ancre la racine au projet.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
