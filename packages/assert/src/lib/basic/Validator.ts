import type { BaseValidator } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * Creates a decorator that validates the decorated property using the given validator.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Validator(s.string.array)
 *   public value: string[] = ["a string"];
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").BaseError} Thrown if the decorated property is not valid.
 *
 * @since 1.0.0
 */
export function Validator(validator: BaseValidator<any>): PropertyDecorator {
	return createDecorator(validator);
}
