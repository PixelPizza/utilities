import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

const assertion = s.number.negative.or(s.bigint.negative);

/**
 * A decorator that validates that the value is a negative number or bigint.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Negative({ assertionEnabled: false })
 *   public number: number = 1;
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").CombinedError} Thrown if the decorated property is not a number or bigint or is not negative.
 *
 * @since 1.1.0
 */
export function Negative(
	options: AssertionOptions
): PropertyDecorator & ParameterDecorator;
/**
 * A decorator that validates that the value is a negative number or bigint.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Negative
 *   public number: number = -1;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").CombinedError} Thrown if the decorated property is not a number or bigint or is not negative.
 *
 * @since 1.0.0
 */
export function Negative(
	target: NonNullable<unknown>,
	key: string | symbol,
	parameterIndex?: number
): void;
export function Negative(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol,
	parameterIndex?: number
) {
	if (key || parameterIndex !== undefined) {
		return createDecorator(assertion)(
			targetOrOptions,
			key,
			parameterIndex!
		);
	}

	return createDecorator(
		assertion,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
