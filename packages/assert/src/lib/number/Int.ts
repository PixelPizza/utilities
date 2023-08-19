import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * A decorator that validates that the value is an integer.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Int({ assertionEnabled: false })
 *   public number: number = 3.3;
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an integer.
 *
 * @since 1.1.0
 * @see Number.isInteger
 */
export function Int(
	options: AssertionOptions
): PropertyDecorator & ParameterDecorator;
/**
 * A decorator that validates that the value is an integer.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Int
 *   public number: number = 3;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an integer.
 *
 * @since 1.0.0
 * @see Number.isInteger
 */
export function Int(
	target: NonNullable<unknown>,
	key: string | symbol,
	parameterIndex?: number
): void;
export function Int(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol,
	parameterIndex?: number
) {
	if (key || parameterIndex !== undefined) {
		return createDecorator(s.number.int)(
			targetOrOptions,
			key,
			parameterIndex!
		);
	}

	return createDecorator(
		s.number.int,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
