"use client";

/**
 * ThemeProvider — fin wrapper autour de next-themes.
 * À monter dans le layout racine :
 *   <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
 * (et penser à `suppressHydrationWarning` sur <html>).
 */
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
