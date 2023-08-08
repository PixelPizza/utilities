import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

function createAssertion(value: number | bigint) {
	if (typeof value === "bigint") return s.bigint.divisibleBy(value);
	return s.number.divisibleBy(value);
}

/**
 * Creates a decorator that validates that the value is a number or bigint and is divisible by the given value.
 *
 * @example
 * ```typescript
 * class Example {
 *   @DivisibleBy(2n)
 *   public divisibleByTwo: bigint = 0n;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number or bigint.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not divisible by the given value.
 *
 * @since 1.0.0
 */
export function DivisibleBy(value: number | bigint) {
	return createDecorator(createAssertion(value));
}
