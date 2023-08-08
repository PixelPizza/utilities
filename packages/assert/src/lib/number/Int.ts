import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

/**
 * A decorator that validates that the value is an integer.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Int
 *   public number: number = 3;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an integer.
 *
 * @since 1.0.0
 * @see Number.isInteger
 */
export function Int(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.number.int, target, String(key));
}
