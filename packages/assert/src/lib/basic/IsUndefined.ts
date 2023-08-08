import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

/**
 * Decorator that checks if the value is `undefined`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsUndefined
 *   public isUndefined = undefined;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not `undefined`.
 *
 * @since 1.0.0
 */
export function IsUndefined(target: unknown, key: string): void {
	defineObjectPropertyWithAssertion(s.undefined, target, key);
}
