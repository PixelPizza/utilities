import { s } from "@sapphire/shapeshift";
import { Validator } from "../basic/Validator";

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
export function Email(target: unknown, key: string): void {
	Validator(s.string.email)(target as NonNullable<unknown>, key);
}
