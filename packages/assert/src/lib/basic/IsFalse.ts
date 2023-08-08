import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * Decorator that checks if the value is `false`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsFalse
 *   public isFalse = false;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the value is not a boolean.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the value is not `false`.
 *
 * @since 1.0.0
 */
export const IsFalse: PropertyDecorator = (target, key) =>
	createDecorator(s.boolean.false)(target, key);
