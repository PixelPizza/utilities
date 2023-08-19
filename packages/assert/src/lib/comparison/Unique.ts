import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * A decorator that validates that the value is an array with unique values.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Unique({ assertionEnabled: false })
 *   public array: number[] = [1, 2, 1];
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not an array.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property does not contain unique values.
 *
 * @since 1.1.0
 */
export function Unique(
	options: AssertionOptions
): PropertyDecorator & ParameterDecorator;
/**
 * A decorator that validates that the value is an array with unique values.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Unique
 *   public array: number[] = [1, 2, 3];
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not an array.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property does not contain unique values.
 *
 * @since 1.0.0
 */
export function Unique(
	target: NonNullable<unknown>,
	key: string | symbol,
	parameterIndex?: number
): void;
export function Unique(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol,
	parameterIndex?: number
) {
	if (key || parameterIndex !== undefined) {
		return createDecorator(s.any.array.unique)(
			targetOrOptions,
			key,
			parameterIndex!
		);
	}

	return createDecorator(
		s.any.array.unique,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
