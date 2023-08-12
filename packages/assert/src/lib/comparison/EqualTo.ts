import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * The options for {@link EqualTo}.
 * @since 1.1.0
 */
interface EqualToOptions extends AssertionOptions {
	/**
	 * The value to compare against.
	 */
	equalTo: any;
}

/**
 * Creates the options for {@link EqualTo}.
 * @param options The options.
 * @returns The options.
 *
 * @since 1.1.0
 */
function createOptions(options: any): EqualToOptions {
	if (typeof options === "object" && options !== null && "equalTo" in options)
		return options;
	return { equalTo: options };
}

/**
 * Creates a decorator that validates that the value is equal to the given value.
 *
 * @example
 * ```typescript
 * class Example {
 *   @EqualTo({ equalTo: 2 })
 *   public two: number = 2;
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the decorated property is not equal to the given value.
 *
 * @since 1.1.0
 */
export function EqualTo(options: EqualToOptions): PropertyDecorator;
/**
 * Creates a decorator that validates that the value is equal to the given value.
 *
 * @example
 * ```typescript
 * class Example {
 *   @EqualTo(2)
 *   public two: number = 2;
 * }
 * ```
 *
 * @param value The value to compare against.
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the decorated property is not equal to the given value.
 *
 * @since 1.0.0
 */
export function EqualTo(value: any): PropertyDecorator;
export function EqualTo(value: any) {
	const options = createOptions(value);
	return createDecorator(
		s.literal(options.equalTo),
		options.assertionEnabled
	);
}
