import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * A decorator that validates that the value is a valid date.
 *
 * @example
 * ```typescript
 * class Example {
 *   @ValidDate({ assertionEnabled: false })
 *   public date: Date = new Date("invalid");
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a date.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is an invalid date.
 *
 * @since 1.1.0
 */
export function ValidDate(options: AssertionOptions): PropertyDecorator;
/**
 * A decorator that validates that the value is a valid date.
 *
 * @example
 * ```typescript
 * class Example {
 *   @ValidDate
 *   public date: Date = new Date("2020-1-1");
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a date.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is an invalid date.
 *
 * @since 1.0.0
 */
export function ValidDate(
	target: NonNullable<unknown>,
	key: string | symbol
): void;
export function ValidDate(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol
) {
	if (key) {
		return createDecorator(s.date.valid)(targetOrOptions, key);
	}

	return createDecorator(
		s.date.valid,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
