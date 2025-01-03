import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full container bg-base border rounded-lg shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://lfpweather.com" className="hover:underline">
            lfpweather.com
          </a>
          . all rights reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <span className="flex items-center">
              made with&nbsp;
              <Heart className="inline h-4 w-4 text-red-500" /> &nbsp;in lake
              forest park, wa
            </span>
          </li>
        </ul>
      </div>
    </footer>
  );
}
