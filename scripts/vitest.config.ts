import { defineConfig, type UserConfig } from "vitest/config";
import { ESBuildOptions } from "vite";

export const createVitestConfig = (options: UserConfig = {}) =>
	defineConfig({
		...options,
		test: {
			...options.test,
			globals: true,
			coverage: {
				...options.test?.coverage,
				provider: "v8",
				enabled: true,
				reporter: ["text", "lcov", "clover"],
				exclude: [
					...(options.test?.coverage?.exclude ?? []),
					"**/node_modules/**",
					"**/dist/**",
					"**/test/**"
				]
			}
		},
		esbuild: {
			...options.esbuild,
			target:
				(options.esbuild as ESBuildOptions | undefined)?.target ??
				"es2020"
		}
	});
