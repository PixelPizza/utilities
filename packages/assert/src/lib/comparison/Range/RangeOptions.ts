import type { AssertionOptions } from "../../Assertion";

/**
 * Options for the range assertion.
 *
 * @since 1.0.0
 */
export interface RangeOptions<T extends number | bigint = number | bigint>
	extends AssertionOptions {
	/**
	 * The value must be greater than or equal to the given number or bigint.
	 */
	min?: T;
	/**
	 * The value must be less than or equal to the given number or bigint.
	 */
	max?: T;
	/**
	 * The value must be equal to the given number or bigint.
	 */
	equal?: T;
	/**
	 * The value must not be equal to the given number or bigint.
	 */
	notEqual?: T;
	/**
	 * The value must be greater than the given number or bigint.
	 */
	greaterThan?: T;
	/**
	 * The value must be less than to the given number or bigint.
	 */
	lessThan?: T;
}

/**
 * Creates a range options object from the given options.
 * @param options The options to create the range options from.
 * @param max The maximum value.
 *
 * @since 1.0.0
 */
export function createOptions(
	options: number | bigint | RangeOptions,
	max?: number | bigint
) {
	if (typeof options !== "object") {
		return max ? { min: options, max } : { max: options };
	}
	return options;
}
