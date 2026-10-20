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
  BatteryCharging,
  ImageIcon,
  CloudSun,
  Camera,
  Flame,
  Sprout,
  ThermometerSun,
  Droplets,
  TrendingUp,
} from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { NavigationLink } from "./link";
import AskBar from "@/components/ask/ask-bar";
import { SECTIONS } from "@/lib/sections";
import Main from "@/public/svg/main.svg";

type SectionLink = {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
};

const icon = "h-3.5 w-3.5";
const SECTION_ICONS: Record<string, React.ReactNode> = {
  "current-conditions": <Thermometer className={icon} />,
  "ai-forecast": <BrainCircuit className={icon} />,
  "station-forecast": <TrendingUp className={icon} />,
  "heat-stress": <ThermometerSun className={icon} />,
  "7-day-history": <BarChart3 className={icon} />,
  "fire-weather": <Flame className={icon} />,
  "degree-days": <Sprout className={icon} />,
  evapotranspiration: <Droplets className={icon} />,
  "birdnet-24h": <Bird className={icon} />,
  seismology: <Activity className={icon} />,
  "solar-batteries": <BatteryCharging className={icon} />,
  "forecast-images": <ImageIcon className={icon} />,
  "nws-forecast": <CloudSun className={icon} />,
  "local-cameras": <Camera className={icon} />,
  "power-breakdown": <Zap className={icon} />,
};

export default function Navigation({
  disabledSections = [],
}: {
  disabledSections?: string[];
}) {
  const pageLinks: NavigationLink[] = [
    { id: 2, title: "records", href: "/records" },
    { id: 1, title: "about", href: "/about" },
  ];

  const disabled = new Set(disabledSections);
  const sectionLinks: SectionLink[] = SECTIONS.filter(
    (section) => section.navTitle && section.href && !disabled.has(section.key)
  ).map((section, i) => ({
    id: i,
    title: section.navTitle as string,
    href: section.href as string,
    icon: SECTION_ICONS[section.key],
  }));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto flex h-14 items-center px-4 relative">
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

        {/* Ask bar */}
        <AskBar />

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
