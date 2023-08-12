import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * The options for {@link Length}.
 * @since 1.0.0
 */
interface LengthOptions extends AssertionOptions {
	/**
	 * The length of the string must be greater than or equal to the given length.
	 */
	min?: number;
	/**
	 * The length of the string must be less than or equal to the given length.
	 */
	max?: number;
	/**
	 * The length of the string must be equal to the given length.
	 */
	equal?: number;
	/**
	 * The length of the string must be greater than the given length.
	 */
	greaterThan?: number;
	/**
	 * The length of the string must be less than the given length.
	 */
	lessThan?: number;
	/**
	 * The length of the string must not be equal to the given length.
	 */
	notEqual?: number;
}

/**
 * Creates a decorator that validates the decorated property is a string within the specified length.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Length({ min: 1, max: 5 })
 *   public value: string = "name";
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified length.
 *
 * @since 1.0.0
 */
export function Length(options: LengthOptions): PropertyDecorator;
/**
 * Creates a decorator that validates the decorated property is a string within the specified length.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Length(5)
 *   public value: string = "name";
 * }
 * ```
 *
 * @param max The maximum length of the string.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified length.
 *
 * @since 1.0.0
 */
export function Length(max: number): PropertyDecorator;
/**
 * Creates a decorator that validates the decorated property is a string within the specified length.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Length(1, 5)
 *   public value: string = "name";
 * }
 * ```
 *
 * @param min The minimum length of the string.
 * @param max The maximum length of the string.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified length.
 *
 * @since 1.0.0
 */
export function Length(min: number, max: number): PropertyDecorator;
export function Length(
	options: number | LengthOptions,
	max?: number
): PropertyDecorator {
	function createOptions(options: number | LengthOptions, max?: number) {
		if (typeof options === "number") {
			return max ? { min: options, max } : { max: options };
		}

		return options;
	}

	function createAssertion(options: LengthOptions) {
		let assertion = s.string;

		if (options.min) {
			assertion = assertion.lengthGreaterThanOrEqual(options.min);
		}

		if (options.max) {
			assertion = assertion.lengthLessThanOrEqual(options.max);
		}

		if (options.equal) {
			assertion = assertion.lengthEqual(options.equal);
		}

		if (options.greaterThan) {
			assertion = assertion.lengthGreaterThan(options.greaterThan);
		}

		if (options.lessThan) {
			assertion = assertion.lengthLessThan(options.lessThan);
		}

		if (options.notEqual) {
			assertion = assertion.lengthNotEqual(options.notEqual);
		}

		return assertion;
	}

	const newOptions = createOptions(options, max);
	return createDecorator(
		createAssertion(newOptions),
		newOptions.assertionEnabled
	);
}
