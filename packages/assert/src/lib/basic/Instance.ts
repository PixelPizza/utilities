import { type Constructor, s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

/**
 * Decorator that checks if the value is an instance of the given value.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Instance(Date)
 *   public value = new Date();
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not an instance of the given value.
 *
 * @since 1.0.0
 */
export function Instance(expected: Constructor<unknown>): PropertyDecorator {
	return (target: unknown, key: string | symbol) => {
		defineObjectPropertyWithAssertion(
			s.instance(expected),
			target,
			String(key)
		);
	};
}
