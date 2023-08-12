import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * Decorator that checks if the value is `undefined`.
 *
 * @example
 * ```typescript
 * class Example {
 *   @IsUndefined({ assertionEnabled: false })
 *   public isUndefined = null;
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ExpectedValidationError} Thrown if the value is not `undefined`.
 *
 * @since 1.1.0
 */
export function IsUndefined(options: AssertionOptions): PropertyDecorator;
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
export function IsUndefined(
	target: NonNullable<unknown>,
	key: string | symbol
): void;
export function IsUndefined(
	target: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol
) {
	if (key) {
		return createDecorator(s.undefined)(target, key);
	}

	return createDecorator(
		s.undefined,
		(target as AssertionOptions).assertionEnabled
	);
}
