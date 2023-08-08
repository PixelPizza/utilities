import { s } from "@sapphire/shapeshift";
import { Validator } from "../basic/Validator";

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
export function Phone(target: unknown, key: string | symbol): void {
	Validator(s.string.phone())(target as NonNullable<unknown>, key);
}
