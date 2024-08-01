import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";
import tslint, { ConfigWithExtends } from "typescript-eslint";
import unusedImportPlugin from "eslint-plugin-unused-imports";

const configGenerator = (tsRules: ConfigWithExtends['rules'] = {}, ...extraConfigs: ConfigWithExtends[]) => tslint.config(
  {
    ignores: ["**/eslint.config.mjs", "**/dist/**"],
  },
  eslint.configs.recommended,
  ...tslint.configs.strict,
  {
    name: "TypeScript Source Files",
    plugins: {
      "@typescript-eslint": tslint.plugin,
      import: importPlugin,
      "unused-imports": unusedImportPlugin,
    },
    languageOptions: {
      parser: tslint.parser,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "class-methods-use-this": "off",
      "import/no-named-as-default": "off",
      ...tsRules,
    },
  },
  {
    name: "JavaScript Configuration Files",
    files: ["**/*.{cjs,js,mjs}"],
    languageOptions: {
      globals: {
        console: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },
  },
  prettierConfig,
  ...extraConfigs,
);

export default configGenerator;
