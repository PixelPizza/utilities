import { type Constructor, s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

interface InstanceOptions extends AssertionOptions {
	/**
	 * The expected constructor.
	 */
	expected: Constructor<unknown>;
}

function createOptions(
	expectedOrOptions: Constructor<unknown> | InstanceOptions
) {
	if (typeof expectedOrOptions === "function") {
		expectedOrOptions = { expected: expectedOrOptions };
	}

	return expectedOrOptions;
}

/**
 * Decorator that checks if the value is an instance of the given value.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Instance({ expected: Date })
 *   public value = new Date();
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not an instance of the given value.
 *
 * @since 1.1.0
 */
export function Instance(options: InstanceOptions): PropertyDecorator;
/**
 * Decorator that checks if the value is an instance of the given value.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Instance(Date)
 *   public value = new Date();
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not an instance of the given value.
 *
 * @since 1.0.0
 */
export function Instance(expected: Constructor<unknown>): PropertyDecorator;
/**
 * Decorator that checks if the value is an instance of the given value.
 *
 * @internal This overload is only used for testing.
 */
export function Instance(
	options: Constructor<unknown> | InstanceOptions
): PropertyDecorator;
export function Instance(
	expectedOrOptions: Constructor<unknown> | InstanceOptions
): PropertyDecorator {
	const options = createOptions(expectedOrOptions);
	return createDecorator(
		s.instance(options.expected),
		options.assertionEnabled
	);
}
