import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * A decorator that validates that the value is a safe integer.
 *
 * @example
 * ```typescript
 * class Example {
 *   @SafeInt({ assertionEnabled: false })
 *   public number: number = Number.MAX_SAFE_INTEGER + 1;
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an integer.
 *
 * @since 1.1.0
 * @see Number.isSafeInteger
 */
export function SafeInt(options: AssertionOptions): PropertyDecorator;
/**
 * A decorator that validates that the value is a safe integer.
 *
 * @example
 * ```typescript
 * class Example {
 *   @SafeInt
 *   public number: number = 3;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an integer.
 *
 * @since 1.0.0
 * @see Number.isSafeInteger
 */
export function SafeInt(
	target: NonNullable<unknown>,
	key: string | symbol
): void;
export function SafeInt(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol
) {
	if (key) {
		return createDecorator(s.number.safeInt)(targetOrOptions, key);
	}

	return createDecorator(
		s.number.safeInt,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
