import { dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: {},
  allConfig: {},
});

globalThis.require = globalThis.require || createRequire(import.meta.url);

const eslintConfig = [
  // ESLint 9 lints every file `eslint .` finds, so the directories Next and the
  // editor generate have to be named. `next lint` only ever looked at
  // app/components/lib, which is why these were invisible before the script
  // moved to the plain ESLint CLI.
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      ".remember/**",
      // Written by Next, not by us.
      "next-env.d.ts",
      "*.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Config files are loaded outside the Next toolchain and may be CommonJS.
  {
    files: ["**/*.config.ts", "**/*.config.mts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
