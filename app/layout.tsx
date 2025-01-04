import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { funneldisplay } from "./fonts";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation/navigation";

export const metadata: Metadata = {
  title: "lfpweather.com",
  description: "lake forest park weather",
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
    </html>
  );
}
