import { createTsupConfig } from "../../scripts/tsup.config";
import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions";

export default createTsupConfig({
	bundle: true,
	entry: ["src/**/*.ts", "!src/**/*.d.ts"],
	format: ["cjs", "esm"],
	dts: false,
	esbuildPlugins: [esbuildPluginFilePathExtensions()]
});
