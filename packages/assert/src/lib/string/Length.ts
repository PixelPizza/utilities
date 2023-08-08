import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

interface LengthOptions {
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
	return (target: unknown, key: string | symbol) => {
		function createOptions(options: number | LengthOptions, max?: number) {
			if (typeof options === "number") {
				return max ? { min: options, max } : { max: options };
			}

			return options;
		}

		function createAssertion() {
			const newOptions = createOptions(options, max);

			let assertion = s.string;

			if (newOptions.min) {
				assertion = assertion.lengthGreaterThanOrEqual(newOptions.min);
			}

			if (newOptions.max) {
				assertion = assertion.lengthLessThanOrEqual(newOptions.max);
			}

			if (newOptions.equal) {
				assertion = assertion.lengthEqual(newOptions.equal);
			}

			if (newOptions.greaterThan) {
				assertion = assertion.lengthGreaterThan(newOptions.greaterThan);
			}

			if (newOptions.lessThan) {
				assertion = assertion.lengthLessThan(newOptions.lessThan);
			}

			if (newOptions.notEqual) {
				assertion = assertion.lengthNotEqual(newOptions.notEqual);
			}

			return assertion;
		}

		defineObjectPropertyWithAssertion(
			createAssertion(),
			target,
			String(key)
		);
	};
}
