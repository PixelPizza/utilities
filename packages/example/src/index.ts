/**
 * The version of this package you are currently using.
 * This can be used to display the version of the package in your application.
 *
 * Note to self: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = "[VI]{{inject}}[/VI]";
