import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * A decorator that validates that the value is a finite number.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Finite
 *   public number: number = 3;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not finite.
 *
 * @since 1.0.0
 * @see Number.isFinite
 */
export const Finite: PropertyDecorator = (target, key) =>
	createDecorator(s.number.finite)(target, key);
