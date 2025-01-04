"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { CloudSun, Menu } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { NavigationLink } from "./link";

export default function Navigation() {
  const sheetLinks: NavigationLink[] = [
    { id: 1, title: "about", href: "/about" },
  ];

  const barLinks: NavigationLink[] = [
    { id: 1, title: "about", href: "/about" },
  ];

  return (
    <header className="container bg-base border rounded-lg shadow m-4 flex py-2 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <CloudSun />
            <span className="text-lg">lfpweather.com</span>
          </Link>
          <div className="grid gap-4 py-6">
            {sheetLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex w-full items-center py-2 text-lg"
                prefetch={false}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-[150px] hidden lg:flex">
        <Link
          href="/"
          className="flex items-center gap-2 px-2"
          prefetch={false}
        >
          <CloudSun />
          <span className="text-lg">lfpweather.com</span>
        </Link>
      </div>
      <div className="flex grow justify-center">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {barLinks.map((link) => (
              <NavigationMenuLink key={link.id} asChild>
                <Link
                  href={link.href}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  {link.title}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="w-[150px]">
        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
