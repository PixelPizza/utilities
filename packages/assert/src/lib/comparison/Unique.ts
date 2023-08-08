import { s } from "@sapphire/shapeshift";
import { Validator } from "../basic/Validator";

/**
 * A decorator that validates that the value is an array with unique values.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Unique
 *   public array: number[] = [1, 2, 3];
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not an array.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property does not contain unique values.
 *
 * @since 1.0.0
 */
export function Unique(target: unknown, key: string | symbol): void {
	Validator(s.any.array.unique)(target as NonNullable<unknown>, key);
}
