import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit tests run outside Next, so they need the `@/` path alias that tsconfig
// defines and nothing else from the Next config. Components that import CSS or
// SVGs are not covered here; keep this suite to plain TypeScript logic.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**", ".remember/**"],
    clearMocks: true,
  },
});
