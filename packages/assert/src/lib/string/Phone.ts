import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * A decorator that validates that the value is a phone string.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Phone({ assertionEnabled: false })
 *   public phone: string = "+3164";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a phone number.
 *
 * @since 1.1.0
 */
export function Phone(options: AssertionOptions): PropertyDecorator;
/**
 * A decorator that validates that the value is a phone string.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Phone
 *   public phone: string = "+31643434343";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a phone number.
 *
 * @since 1.0.0
 */
export function Phone(target: NonNullable<unknown>, key: string | symbol): void;
export function Phone(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol
) {
	if (key) {
		return createDecorator(s.string.phone())(targetOrOptions, key);
	}

	return createDecorator(
		s.string.phone(),
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
