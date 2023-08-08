import { readFile, writeFile, opendir } from "node:fs/promises";
import { join } from "node:path";

/**
 * @param path {string}
 * @return {AsyncGenerator<string, void, any>}
 */
async function* walk(path) {
	const dir = await opendir(path);

	let file;
	while ((file = await dir.read())) {
		const path = join(dir.path, file.name);
		if (file.isDirectory()) {
			yield* walk(path);
		} else if (file.isFile()) {
			yield path;
		}
	}
}

const rootDirFiles = walk("dist");

const dtsFiles = [];
for await (const file of rootDirFiles) {
	if (!file.endsWith(".d.ts")) {
		continue;
	}
	dtsFiles.push(file);
}

await Promise.all(
	dtsFiles.map(async (dtsFile) => {
		const dmtsFile = dtsFile.replace(".ts", ".mts");
		const dts = await readFile(dtsFile);
		await writeFile(dmtsFile, dts);
	})
);
