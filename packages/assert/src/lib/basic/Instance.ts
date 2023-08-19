import { type Constructor, s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * The options for {@link Instance}.
 *
 * @since 1.1.0
 */
interface InstanceOptions extends AssertionOptions {
	/**
	 * The expected constructor.
	 */
	expected: Constructor<unknown>;
}

/**
 * Creates the options for {@link Instance}.
 * @param expectedOrOptions The expected constructor or the options.
 * @returns The options for {@link Instance}.
 */
function createOptions(
	expectedOrOptions: Constructor<unknown> | InstanceOptions
): InstanceOptions {
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
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not an instance of the given value.
 *
 * @since 1.1.0
 */
export function Instance(
	options: InstanceOptions
): PropertyDecorator & ParameterDecorator;
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
 * @param expected The expected constructor.
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not an instance of the given value.
 *
 * @since 1.0.0
 */
export function Instance(
	expected: Constructor<unknown>
): PropertyDecorator & ParameterDecorator;
/**
 * Decorator that checks if the value is an instance of the given value.
 *
 * @internal This overload is only used for testing.
 */
export function Instance(
	options: Constructor<unknown> | InstanceOptions
): PropertyDecorator & ParameterDecorator;
export function Instance(
	expectedOrOptions: Constructor<unknown> | InstanceOptions
) {
	const options = createOptions(expectedOrOptions);

	return createDecorator(
		s.instance(options.expected),
		options.assertionEnabled
	);
}
