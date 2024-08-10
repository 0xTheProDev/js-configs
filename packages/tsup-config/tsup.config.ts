import { defineConfig } from "./src/tsup.config";

export default defineConfig({
  entry: ["src/tsup.config.ts"],
  libOptions: {
    startYear: 2024,
  },
});
