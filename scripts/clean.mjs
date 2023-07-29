import { rm } from "node:fs/promises";

const rootDir = new URL("../", import.meta.url);
const packagesDir = new URL("packages/", rootDir);
const options = { recursive: true, force: true };

const paths = [
	// Dist folders
	new URL("example/dist/", packagesDir),

	// Turbo folders
	new URL("example/.turbo/", packagesDir)
];

await Promise.all(paths.map((path) => rm(path, options)));
