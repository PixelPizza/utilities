import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * A decorator that validates that the value is an email string.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Date({ assertionEnabled: false })
 *   public email: string = "example.com";
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an email.
 *
 * @since 1.1.0
 */
export function Email(options: AssertionOptions): PropertyDecorator;
/**
 * A decorator that validates that the value is an email string.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Date
 *   public email: string = "email@example.com";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an email.
 *
 * @since 1.0.0
 */
export function Email(target: NonNullable<unknown>, key: string | symbol): void;
export function Email(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol
) {
	if (key) {
		return createDecorator(s.string.email)(targetOrOptions, key);
	}

	return createDecorator(
		s.string.email,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
