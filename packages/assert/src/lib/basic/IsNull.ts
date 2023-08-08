import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

/**
 * Decorator that checks if the value is `null`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsNull
 *   public isNull = null;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not `null`.
 *
 * @since 1.0.0
 */
export function IsNull(target: unknown, key: string): void {
	defineObjectPropertyWithAssertion(s.null, target, key);
}
