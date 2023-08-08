import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

/**
 * A decorator that validates that the value is a safe integer.
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
 * @see Number.isSafeInteger
 */
export function SafeInt(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.number.safeInt, target, String(key));
}
