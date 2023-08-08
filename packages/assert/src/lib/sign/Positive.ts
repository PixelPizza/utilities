import { s } from "@sapphire/shapeshift";
import { Validator } from "../basic/Validator";

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
export function Positive(target: unknown, key: string | symbol): void {
	Validator(s.number.positive.or(s.bigint.positive))(
		target as NonNullable<unknown>,
		key
	);
}
