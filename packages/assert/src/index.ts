import { Assert } from "./lib/Assert";

export * from "./lib/basic/IsFalse";
export * from "./lib/basic/IsNull";
export * from "./lib/basic/IsTrue";
export * from "./lib/basic/IsUndefined";
export * from "./lib/comparison/Range";
export * from "./lib/comparison/DateRange";
export * from "./lib/comparison/DivisibleBy";
export * from "./lib/comparison/EqualTo";
export * from "./lib/comparison/Unique";
export * from "./lib/date/ValidDate";
export * from "./lib/date/InvalidDate";
export * from "./lib/number/Finite";
export * from "./lib/number/Int";
export * from "./lib/number/SafeInt";
export * from "./lib/sign/Negative";
export * from "./lib/sign/Positive";
export * from "./lib/string/Date";
export * from "./lib/string/Email";
export * from "./lib/string/Ip";
export * from "./lib/string/Length";
export * from "./lib/string/Phone";
export * from "./lib/string/Regex";
export * from "./lib/string/Url";
export * from "./lib/string/Uuid";
export * from "./lib/Assert";

export default Assert;

/**
 * The version of this package you are currently using.
 * This can be used to display the version of the package in your application.
 *
 * Note to self: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = "[VI]{{inject}}[/VI]";
