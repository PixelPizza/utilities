import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

const assertion = s.number.positive.or(s.bigint.positive);

/**
 * A decorator that validates that the value is a positive number or bigint.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Positive({ assertionEnabled: false })
 *   public number: number = -1;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").CombinedError} Thrown if the decorated property is not a number or bigint or is not positive.
 *
 * @since 1.1.0
 */
export function Positive(options: AssertionOptions): PropertyDecorator;
/**
 * A decorator that validates that the value is a positive number or bigint.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Positive
 *   public number: number = 1;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").CombinedError} Thrown if the decorated property is not a number or bigint or is not positive.
 *
 * @since 1.0.0
 */
export function Positive(
	target: NonNullable<unknown>,
	key: string | symbol
): void;
export function Positive(
	targetOrOptions: NonNullable<unknown> | AssertionOptions,
	key?: string | symbol
) {
	if (key) {
		return createDecorator(assertion)(targetOrOptions, key);
	}

	return createDecorator(
		assertion,
		(targetOrOptions as AssertionOptions).assertionEnabled
	);
}
