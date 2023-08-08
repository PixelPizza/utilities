import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

/**
 * Creates a decorator that validates the decorated property adheres to the specified regex
 *
 * @example
 * ```typescript
 * class Example {
 *   @Regex(/test/)
 *   public value: string = "ateststring";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property does not adhere to the specified regex.
 *
 * @since 1.0.0
 */
export function Regex(regex: RegExp): PropertyDecorator {
	return createDecorator(s.string.regex(regex));
}
