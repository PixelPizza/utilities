import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * Decorator that checks if the value is `true`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsTrue
 *   public isTrue = true;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the value is not a boolean.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the value is not `true`.
 *
 * @since 1.0.0
 */
export const IsTrue: PropertyDecorator = (target, key) =>
	createDecorator(s.boolean.true)(target, key);
