"use client";

/**
 * ThemeProvider — fin wrapper autour de next-themes.
 * Monté dans le layout racine (attribute="class", defaultTheme="system").
 */
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
