import type { RangeOptions } from "./RangeOptions";
import { BigIntValidator, NumberValidator, s } from "@sapphire/shapeshift";
import { isOptionsOfBigIntType, isOptionsOfNumberType } from "./Utilities";

/**
 * Creates a number range assertion based on the given options.
 * @param options The options to create the assertion from.
 * @returns The created assertion.
 *
 * @since 1.0.0
 */
function createNumberRangeAssertion(
	options: RangeOptions<number>
): NumberValidator<number> {
	let assertion = s.number;

	if (options.min) {
		assertion = assertion.greaterThanOrEqual(options.min);
	}

	if (options.max) {
		assertion = assertion.lessThanOrEqual(options.max);
	}

	if (options.equal) {
		assertion = assertion.equal(options.equal);
	}

	if (options.notEqual) {
		assertion = assertion.notEqual(options.notEqual);
	}

	if (options.greaterThan) {
		assertion = assertion.greaterThan(options.greaterThan);
	}

	if (options.lessThan) {
		assertion = assertion.lessThan(options.lessThan);
	}

	return assertion;
}

/**
 * Creates a bigint range assertion based on the given options.
 * @param options The options to create the assertion from.
 * @returns The created assertion.
 *
 * @since 1.0.0
 */
function createBigIntRangeAssertion(
	options: RangeOptions<bigint>
): BigIntValidator<bigint> {
	let assertion = s.bigint;

	if (options.min) {
		assertion = assertion.greaterThanOrEqual(options.min);
	}

	if (options.max) {
		assertion = assertion.lessThanOrEqual(options.max);
	}

	if (options.equal) {
		assertion = assertion.equal(options.equal);
	}

	if (options.notEqual) {
		assertion = assertion.notEqual(options.notEqual);
	}

	if (options.greaterThan) {
		assertion = assertion.greaterThan(options.greaterThan);
	}

	if (options.lessThan) {
		assertion = assertion.lessThan(options.lessThan);
	}

	return assertion;
}

/**
 * Creates a range assertion based on the given options.
 * @param options The options to create the assertion from.
 * @returns The created assertion.
 *
 * @since 1.0.0
 */
export function createAssertion(options: RangeOptions) {
	if (isOptionsOfNumberType(options)) {
		return createNumberRangeAssertion(options);
	}
	if (isOptionsOfBigIntType(options)) {
		return createBigIntRangeAssertion(options);
	}
	return null;
}
