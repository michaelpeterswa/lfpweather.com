import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { bricolage, redhatmono } from "./fonts";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f7f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0c140f" },
  ],
};

export const metadata: Metadata = {
  title: "lfpweather.com",
  description: "lake forest park weather",
  metadataBase: new URL("https://lfpweather.com"),
  openGraph: {
    title: "lfpweather.com",
    description:
      "providing local weather observations, forecasts, and cameras to the Lake Forest Park, Washington area",
    type: "website",
    url: "https://lfpweather.com",
  },
  appleWebApp: {
    capable: true,
    title: "lfpweather.com",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body
        className={cn(
          "min-h-screen",
          bricolage.variable,
          redhatmono.variable,
          bricolage.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-ZP78E0LCNM" />
    </html>
  );
}
