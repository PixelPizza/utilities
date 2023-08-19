import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * Decorator that checks if the value is `true`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsTrue
 *   public isTrue = true;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the value is not a boolean.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the value is not `true`.
 *
 * @since 1.0.0
 */
export function IsTrue(
	target: NonNullable<unknown>,
	key: string | symbol,
	parameterIndex?: number
): void;
/**
 * Decorator that checks if the value is `true`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsTrue({ assertionEnabled: false })
 *   public isTrue = false;
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the value is not a boolean.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the value is not `true`.
 *
 * @since 1.1.0
 */
export function IsTrue(
	options: AssertionOptions
): PropertyDecorator & ParameterDecorator;
export function IsTrue(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol,
	parameterIndex?: number
) {
	if (key || parameterIndex !== undefined) {
		return createDecorator(s.boolean.true)(
			targetOrOptions,
			key,
			parameterIndex!
		);
	}

	return createDecorator(
		s.boolean.true,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
