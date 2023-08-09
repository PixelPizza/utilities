import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

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
export const InvalidDate: PropertyDecorator = (target, key) =>
	createDecorator(s.date.invalid)(target, key);
