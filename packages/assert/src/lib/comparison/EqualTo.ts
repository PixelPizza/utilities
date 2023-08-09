import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * Creates a decorator that validates that the value is equal to the given value.
 *
 * @example
 * ```typescript
 * class Example {
 *   @EqualTo(2)
 *   public two: number = 2;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the decorated property is not equal to the given value.
 *
 * @since 1.0.0
 */
export function EqualTo(value: any) {
	return createDecorator(s.literal(value));
}
