import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * A decorator that validates that the value is a safe integer.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Int
 *   public number: number = 3;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an integer.
 *
 * @since 1.0.0
 * @see Number.isSafeInteger
 */
export const SafeInt: PropertyDecorator = (target, key) =>
	createDecorator(s.number.safeInt)(target, key);
