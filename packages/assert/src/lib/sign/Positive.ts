import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * A decorator that validates that the value is a positive number or bigint.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Positive
 *   public number: number = 1;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").CombinedError} Thrown if the decorated property is not a number or bigint or is not positive.
 *
 * @since 1.0.0
 */
export const Positive: PropertyDecorator = (target, key) =>
	createDecorator(s.number.positive.or(s.bigint.positive))(target, key);
