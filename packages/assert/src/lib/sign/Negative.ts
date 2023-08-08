import { s } from "@sapphire/shapeshift";
import { Validator } from "../basic/Validator";

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
export function Negative(target: unknown, key: string | symbol): void {
	Validator(s.number.negative.or(s.bigint.negative))(
		target as NonNullable<unknown>,
		key
	);
}
