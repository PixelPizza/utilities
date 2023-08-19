import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

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
export function IsNull(
	target: NonNullable<unknown>,
	key: string | symbol,
	parameterIndex?: number
): void;
/**
 * Decorator that checks if the value is `null`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsNull({ assertionEnabled: false })
 *   public isNull = undefined;
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not `null`.
 *
 * @since 1.1.0
 */
export function IsNull(
	options: AssertionOptions
): PropertyDecorator & ParameterDecorator;
export function IsNull(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol,
	parameterIndex?: number
) {
	if (key || parameterIndex !== undefined) {
		return createDecorator(s.null)(targetOrOptions, key, parameterIndex!);
	}

	return createDecorator(
		s.null,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
