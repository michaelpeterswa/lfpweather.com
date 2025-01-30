import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { funneldisplay } from "./fonts";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
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
  icons: [
    {
      rel: "apple-touch-icon",
      url: "https://images.lfpweather.com/public/app-clip.svg",
    },
    {
      rel: "mask-icon",
      url: "https://images.lfpweather.com/public/app-clip-gradient.svg",
      color: "#000000",
    },
  ],
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
      <body className={cn("", funneldisplay.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center justify-center px-4 min-h-screen">
            <Navigation />
            {children}
            <div className="grow" />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-ZP78E0LCNM" />
    </html>
  );
}
