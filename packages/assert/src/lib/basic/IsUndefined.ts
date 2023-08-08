import { s } from "@sapphire/shapeshift";
import { Validator } from "./Validator";

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
	Validator(s.undefined)(target as NonNullable<unknown>, key);
}
