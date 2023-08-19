import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * A decorator that validates that the value is a date string.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Date({ assertionEnabled: false })
 *   public dateString: string = "notadate";
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a date string.
 *
 * @since 1.1.0
 */
export function Date(
	options: AssertionOptions
): PropertyDecorator & ParameterDecorator;
/**
 * A decorator that validates that the value is a date string.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Date
 *   public dateString: string = "2020-1-1";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a date string.
 *
 * @since 1.0.0
 */
export function Date(
	target: NonNullable<unknown>,
	key: string | symbol,
	parameterIndex?: number
): void;
export function Date(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol,
	parameterIndex?: number
) {
	if (key || parameterIndex !== undefined) {
		return createDecorator(s.string.date)(
			targetOrOptions,
			key,
			parameterIndex!
		);
	}

	return createDecorator(
		s.string.date,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
