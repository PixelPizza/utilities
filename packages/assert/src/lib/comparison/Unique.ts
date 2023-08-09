import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

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
export const Unique: PropertyDecorator = (target, key) =>
	createDecorator(s.any.array.unique)(target, key);
