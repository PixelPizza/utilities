import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

/**
 * Decorator that checks if the value is `true`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsTrue
 *   public isTrue = true;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the value is not a boolean.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the value is not `true`.
 *
 * @since 1.0.0
 */
export function IsTrue(target: unknown, key: string): void {
	defineObjectPropertyWithAssertion(s.boolean.true, target, key);
}
