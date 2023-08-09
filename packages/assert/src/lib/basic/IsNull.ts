import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * Decorator that checks if the value is `null`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsNull
 *   public isNull = null;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not `null`.
 *
 * @since 1.0.0
 */
export const IsNull: PropertyDecorator = (target, key) =>
	createDecorator(s.null)(target, key);
