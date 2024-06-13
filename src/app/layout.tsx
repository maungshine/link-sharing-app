import type { Metadata } from "next";
import { Instrument_Sans as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
// import { ThemeProvider } from "@/components/provider/providers";
import { getLinks } from "@/queries/link";
import DataProvider from "@/components/provider/DataProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Devlink - your go to link sharing app",
  description: "Devlink is a link sharing app for developers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = await getLinks();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <DataProvider value={links}>{children}</DataProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
