import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * Decorator that checks if the value is `false`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsFalse({ assertionEnabled: false })
 *   public isFalse = true;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the value is not a boolean.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the value is not `false`.
 *
 * @since 1.1.0
 */
export function IsFalse(options: AssertionOptions): PropertyDecorator;
/**
 * Decorator that checks if the value is `false`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsFalse
 *   public isFalse = false;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the value is not a boolean.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the value is not `false`.
 *
 * @since 1.0.0
 */
export function IsFalse(
	target: NonNullable<unknown>,
	key: string | symbol
): void;
export function IsFalse(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol
) {
	if (key) {
		return createDecorator(s.boolean.false)(targetOrOptions, key);
	}

	return createDecorator(
		s.boolean.false,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
