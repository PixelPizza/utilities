import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

/**
 * A decorator that validates that the value is a date string.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Date
 *   public dateString: string = "2020-1-1";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a date string.
 *
 * @since 1.0.0
 */
export function Date(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.string.date, target, String(key));
}
