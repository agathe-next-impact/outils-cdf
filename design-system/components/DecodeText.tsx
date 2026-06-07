"use client";

/**
 * DecodeText — effet « décodage » : brouille puis révèle le texte caractère par
 * caractère (~30 ms/frame). À réserver aux titres courts / héros.
 * Usage : <DecodeText>Mon Titre</DecodeText>
 */
import { useState, useEffect } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZÉÈÊÀÂÇÎÔÙabcdefghijklmnopqrstuvwxyz0123456789!@#%&*";

export function DecodeText({ children }: { children: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const text = children;
    let frame = 0;
    const totalFrames = text.length * 3;

    setDisplayed(
      text
        .split("")
        .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("")
    );

    const interval = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 3);
      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealed) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplayed(result);
      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [children]);

  return <span>{displayed}</span>;
}
