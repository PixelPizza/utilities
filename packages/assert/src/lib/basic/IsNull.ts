import { s } from "@sapphire/shapeshift";
import { Validator } from "./Validator";

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
	Validator(s.null)(target as NonNullable<unknown>, key);
}
