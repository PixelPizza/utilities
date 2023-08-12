import type { RangeOptions } from "./RangeOptions";

/**
 * Checks if the given options are of the given type.
 * @param options The options to check.
 * @param type The type to check for.
 * @returns Whether the options are of the given type.
 *
 * @since 1.0.0
 */
function isOptionsOfType(options: unknown, type: "number" | "bigint"): boolean {
	if (typeof options === type) {
		return true;
	}
	if (typeof options === "object" && options !== null) {
		return Object.values(options).some((value) => typeof value === type);
	}
	return false;
}

/**
 * Checks if the given options are of number type.
 * @param options The options to check.
 * @returns Whether the options are of number type.
 *
 * @since 1.0.0
 */
export function isOptionsOfNumberType(
	options: unknown
): options is number | RangeOptions<number> {
	return isOptionsOfType(options, "number");
}

/**
 * Checks if the given options are of bigint type.
 * @param options The options to check.
 * @returns Whether the options are of bigint type.
 *
 * @since 1.0.0
 */
export function isOptionsOfBigIntType(
	options: unknown
): options is bigint | RangeOptions<bigint> {
	return isOptionsOfType(options, "bigint");
}
