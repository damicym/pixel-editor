import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },

    plugins: {
      react,
      "@typescript-eslint": tseslint.plugin,
    },

    rules: {
      // igual que el video
      "semi": ["error", "never"],

      // fuerza return types
      "@typescript-eslint/explicit-function-return-type": "error",

      // react rule del video
      "react/react-in-jsx-scope": "off",
    },
  },

  // reglas recomendadas
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  react.configs.flat.recommended,
  react.configs["jsx-runtime"],
]);
