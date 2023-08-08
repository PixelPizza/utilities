import { s } from "@sapphire/shapeshift";
import { Validator } from "../basic/Validator";

/**
 * A decorator that validates that the value is an invalid date.
 *
 * @example
 * ```typescript
 * class Example {
 *   @InvalidDate
 *   public date: Date = new Date("invalid");
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a date.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is a valid date.
 *
 * @since 1.0.0
 */
export function InvalidDate(target: unknown, key: string | symbol): void {
	Validator(s.date.invalid)(target as NonNullable<unknown>, key);
}
