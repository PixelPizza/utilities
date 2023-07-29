import { type Options, defineConfig } from "tsup";
import { resolve, relative } from "node:path";

export const createTsupConfig = (options: Options = {}) =>
	defineConfig({
		clean: true,
		dts: true,
		entry: ["src/index.ts"],
		format: ["cjs", "esm"],
		minify: true,
		skipNodeModulesBundle: true,
		sourcemap: true,
		target: "es2021",
		tsconfig: relative(
			__dirname,
			resolve(process.cwd(), "src", "tsconfig.json")
		),
		keepNames: true,
		treeshake: true,
		...options
	});
