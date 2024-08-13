import { defineConfig as _defineConfig, Options } from "tsup";

/**
 * @public
 * Override Default Options Schema to ensure better Type safety.
 */
type OverrideOptions = Omit<Options, "dts"> & {
  dts?: Exclude<Options["dts"], boolean | string>;
};

/**
 * @public
 * Additional metadata for the Library.
 */
type LibOptions = {
  /** Link to the Source Code. */
  sourceURL?: string;
  /** Start Year of the Project. */
  startYear?: number;
};

/**
 * @public
 * Build Configuration Options for Tsup.
 */
export type ConfigOptions = OverrideOptions & {
  /** Library Metadata. */
  libOptions?: LibOptions;
};

const currentYear = new Date().getFullYear();

/**
 * @public
 * Define Tsup Build Configuration.
 * @returns Promise with Configuration or Override Function.
 *
 * @example
 * // tsup.config.ts
 * import { defineConfig } from '@theprodev/tsup-config';
 *
 * export default defineConfig({
 *    entry: ["src/index.ts"],
 *    libOptions: { startYear: 2024 },
 * });
 */
export const defineConfig = (config: ConfigOptions) => {
  const { libOptions: { sourceURL, startYear } = {}, ...options } = config;

  return _defineConfig({
    cjsInterop: true,
    clean: true,
    dts: {
      banner: `/**
  * Copyright © ${startYear && startYear < currentYear ? `${startYear}-` : ""}${currentYear} Progyan Bhattacharya <bprogyan@gmail.com>
  * ${sourceURL ?? "https://github.com/0xTheProDev"}
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  */`,
      resolve: true,
      ...(options.dts ?? {}),
    },
    format: ["cjs", "esm"],
    minify: true,
    outDir: "dist",
    shims: true,
    splitting: false,
    sourcemap: true,
    ...options,
  });
};

export type { Format, NormalizedOptions, Options } from "tsup";
