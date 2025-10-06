import { FlatCompat } from "@eslint/eslintrc";
import nextConfig from "eslint-config-next";
import createConfig from "@theprodev/eslint-config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default createConfig(undefined, {
  extends: ["next", "next/core-web-vitals", "next/typescript"],
  // plugins: {
  //   '@next/next': eslintPluginNext
  // },
  rules: { ...eslintPluginNext.configs.recommended.rules },
});
