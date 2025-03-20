import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.ts"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",

      // General rules
      quotes: ["error", "double"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],

      // ES6+ rules
      "arrow-body-style": ["error", "as-needed"],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];
