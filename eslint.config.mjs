import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignores (migrado do .eslintignore)
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      ".env*",
      "*.log",
      ".eslintcache",
      "*.tsbuildinfo",
      "postcss.config.mjs",
      "tailwind.config.ts",
      "next.config.ts",
      "public/**",
      "*.d.ts"
    ]
  },
  
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  {
    rules: {
      // Production-ready rules
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      
      // React/Next.js specific rules
      "react/jsx-no-leaked-render": "error",
      "react/no-unescaped-entities": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Performance and accessibility
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
      
      // Code quality
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      
      // TypeScript specific
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },
  
  {
    // Allow console in development files
    files: ["scripts/**/*.js", "*.config.{js,ts,mjs}"],
    rules: {
      "no-console": "off",
    },
  },
];

export default eslintConfig;
