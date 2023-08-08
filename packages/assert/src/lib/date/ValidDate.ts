import { s } from "@sapphire/shapeshift";
import { Validator } from "../basic/Validator";

/**
 * A decorator that validates that the value is a valid date.
 *
 * @example
 * ```typescript
 * class Example {
 *   @ValidDate
 *   public date: Date = new Date("2020-1-1");
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a date.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is an invalid date.
 *
 * @since 1.0.0
 */
export function ValidDate(target: unknown, key: string | symbol): void {
	Validator(s.date.valid)(target as NonNullable<unknown>, key);
}
