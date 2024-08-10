const eslint = require("@eslint/js");
const importPlugin = require("eslint-plugin-import");
const prettierConfig = require("eslint-config-prettier");
const tslint = require("typescript-eslint");
const unusedImportPlugin = require("eslint-plugin-unused-imports");

/**
 * @typedef {import("typescript-eslint").ConfigWithExtends} ConfigWithExtends
 */

/**
 * Create ESLint Configuration for TypeScript Projects.
 * @param {Object} overrides - Override Base Rules.
 * @param {Exclude<ConfigWithExtends["rules"], undefined>} overrides.typescript - Custom TypeScript Rules.
 * @param {Exclude<ConfigWithExtends["rules"], undefined>} overrides.javascript - Custom JavaScript Rules.
 * @param  {ConfigWithExtends[]} extraConfigs - Custom ESLint Configurations.
 * @returns Flat Configuration Array for ESLint.
 */
const configGenerator = (overrides, ...extraConfigs) =>
  tslint.config(
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
        ...(overrides?.typescript ?? {}),
      },
    },
    {
      name: "JavaScript Configuration and Source Files",
      files: ["**/*.{cjs,js,mjs}"],
      languageOptions: {
        globals: {
          console: "readonly",
          module: "readonly",
          process: "readonly",
          require: "readonly",
        },
      },
      rules: {
        ...(overrides?.javascript ?? {}),
      },
    },
    prettierConfig,
    ...extraConfigs,
  );

module.exports = configGenerator;
