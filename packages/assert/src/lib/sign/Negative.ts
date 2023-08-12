import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

const assertion = s.number.negative.or(s.bigint.negative);

/**
 * A decorator that validates that the value is a negative number or bigint.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Negative({ assertionEnabled: false })
 *   public number: number = 1;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").CombinedError} Thrown if the decorated property is not a number or bigint or is not negative.
 *
 * @since 1.1.0
 */
export function Negative(options: AssertionOptions): PropertyDecorator;
/**
 * A decorator that validates that the value is a negative number or bigint.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Negative
 *   public number: number = -1;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").CombinedError} Thrown if the decorated property is not a number or bigint or is not negative.
 *
 * @since 1.0.0
 */
export function Negative(
	target: NonNullable<unknown>,
	key: string | symbol
): void;
export function Negative(
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
