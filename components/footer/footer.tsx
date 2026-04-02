import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          &copy; 2025{" "}
          <a href="https://lfpweather.com" className="hover:text-foreground transition-colors">
            lfpweather.com
          </a>
        </span>
        <span className="flex items-center text-sm text-muted-foreground">
          made with&nbsp;
          <Heart className="inline h-3.5 w-3.5 text-red-500" />
          &nbsp;in lake forest park, wa
        </span>
      </div>
    </footer>
  );
}
