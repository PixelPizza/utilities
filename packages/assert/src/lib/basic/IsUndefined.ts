import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * Decorator that checks if the value is `undefined`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsUndefined
 *   public isUndefined = undefined;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not `undefined`.
 *
 * @since 1.0.0
 */
export const IsUndefined: PropertyDecorator = (target, key) =>
	createDecorator(s.undefined)(target, key);
