import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

/**
 * Decorator that checks if the value is `false`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsFalse
 *   public isFalse = false;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the value is not a boolean.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the value is not `false`.
 *
 * @since 1.0.0
 */
export function IsFalse(target: unknown, key: string): void {
	defineObjectPropertyWithAssertion(s.boolean.false, target, key);
}
