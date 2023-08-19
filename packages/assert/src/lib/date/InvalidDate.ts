import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * A decorator that validates that the value is an invalid date.
 *
 * @example
 * ```typescript
 * class Example {
 *   @InvalidDate({ assertionEnabled: false })
 *   public date: Date = new Date(2020, 1, 1);
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a date.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is a valid date.
 *
 * @since 1.1.0
 */
export function InvalidDate(
	options: AssertionOptions
): PropertyDecorator & ParameterDecorator;
/**
 * A decorator that validates that the value is an invalid date.
 *
 * @example
 * ```typescript
 * class Example {
 *   @InvalidDate
 *   public date: Date = new Date("invalid");
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a date.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is a valid date.
 *
 * @since 1.0.0
 */
export function InvalidDate(
	target: NonNullable<unknown>,
	key: string | symbol,
	parameterIndex?: number
): void;
export function InvalidDate(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol,
	parameterIndex?: number
) {
	if (key || parameterIndex !== undefined) {
		return createDecorator(s.date.invalid)(
			targetOrOptions,
			key,
			parameterIndex!
		);
	}

	return createDecorator(
		s.date.invalid,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
