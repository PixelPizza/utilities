import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * A decorator that validates that the value is a finite number.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Finite({ assertionEnabled: false })
 *   public number: number = NaN;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not finite.
 *
 * @since 1.1.0
 * @see Number.isFinite
 */
export function Finite(options: AssertionOptions): PropertyDecorator;
/**
 * A decorator that validates that the value is a finite number.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Finite
 *   public number: number = 3;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not finite.
 *
 * @since 1.0.0
 * @see Number.isFinite
 */
export function Finite(
	target: NonNullable<unknown>,
	key: string | symbol
): void;
export function Finite(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol
) {
	if (key) {
		return createDecorator(s.number.finite)(targetOrOptions, key);
	}

	return createDecorator(
		s.number.finite,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
