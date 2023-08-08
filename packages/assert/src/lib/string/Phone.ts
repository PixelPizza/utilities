import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * A decorator that validates that the value is a phone string.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Phone
 *   public phone: string = "+31643434343";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a phone number.
 *
 * @since 1.0.0
 */
export const Phone: PropertyDecorator = (target, key) =>
	createDecorator(s.string.phone())(target, key);
