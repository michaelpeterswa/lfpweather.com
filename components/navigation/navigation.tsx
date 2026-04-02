"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Menu,
  Thermometer,
  BrainCircuit,
  BarChart3,
  Bird,
  Activity,
  Zap,
  ImageIcon,
  CloudSun,
  Camera,
} from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { NavigationLink } from "./link";
import Main from "@/public/svg/main.svg";

type SectionLink = {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
};

export default function Navigation() {
  const pageLinks: NavigationLink[] = [
    { id: 1, title: "about", href: "/about" },
  ];

  const sectionLinks: SectionLink[] = [
    { id: 1, title: "now", href: "#current-conditions", icon: <Thermometer className="h-3.5 w-3.5" /> },
    { id: 2, title: "ai", href: "#ai-forecast", icon: <BrainCircuit className="h-3.5 w-3.5" /> },
    { id: 3, title: "7d", href: "#7-day-history", icon: <BarChart3 className="h-3.5 w-3.5" /> },
    { id: 4, title: "birds", href: "#birdnet-24h", icon: <Bird className="h-3.5 w-3.5" /> },
    { id: 5, title: "seismic", href: "#seismology", icon: <Activity className="h-3.5 w-3.5" /> },
    { id: 6, title: "power", href: "#power-breakdown", icon: <Zap className="h-3.5 w-3.5" /> },
    { id: 7, title: "images", href: "#forecast-images", icon: <ImageIcon className="h-3.5 w-3.5" /> },
    { id: 8, title: "forecast", href: "#nws-forecast", icon: <CloudSun className="h-3.5 w-3.5" /> },
    { id: 9, title: "cameras", href: "#local-cameras", icon: <Camera className="h-3.5 w-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto flex h-14 items-center px-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden mr-2">
              <Menu />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <Main className="h-8 w-8 fill-primary" />
              <span className="text-lg font-bold">lfpweather.com</span>
            </Link>
            <div className="grid gap-2 py-6">
              {pageLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="flex w-full items-center py-2 text-lg"
                  prefetch={false}
                >
                  {link.title}
                </Link>
              ))}
              <div className="border-t pt-3 mt-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">sections</span>
                <div className="grid gap-1 mt-2">
                  {sectionLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.icon}
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 mr-6"
          prefetch={false}
        >
          <Main className="h-8 w-8 fill-primary" />
          <span className="text-lg font-bold hidden sm:inline">lfpweather.com</span>
        </Link>

        {/* Desktop page nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {pageLinks.map((link) => (
              <NavigationMenuLink key={link.id} asChild>
                <Link
                  href={link.href}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground"
                  prefetch={false}
                >
                  {link.title}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex-1" />

        {/* Theme toggle */}
        <ModeToggle />
      </div>

      {/* Section jump nav - desktop */}
      <div className="hidden lg:block border-t">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 py-1 overflow-x-auto">
            {sectionLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors whitespace-nowrap"
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Section jump nav - mobile (horizontal scroll) */}
      <div className="lg:hidden border-t">
        <div className="px-4">
          <nav className="flex items-center gap-1 py-1 overflow-x-auto scrollbar-hide">
            {sectionLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors whitespace-nowrap"
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
