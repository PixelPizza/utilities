import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

function createAssertion(value: number | bigint) {
	if (typeof value === "bigint") return s.bigint.divisibleBy(value);
	return s.number.divisibleBy(value);
}

interface DivisibleByOptions extends AssertionOptions {
	/**
	 * The value must be divisible by the given value.
	 */
	divisibleBy: number | bigint;
}

function createOptions(
	value: number | bigint | DivisibleByOptions
): DivisibleByOptions {
	if (typeof value === "object") return value;
	return { divisibleBy: value };
}

/**
 * Creates a decorator that validates that the value is a number or bigint and is divisible by the given value.
 *
 * @example
 * ```typescript
 * class Example {
 *   @DivisibleBy({ divisibleBy: 2n })
 *   public divisibleByTwo: bigint = 0n;
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number or bigint.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not divisible by the given value.
 *
 * @since 1.1.0
 */
export function DivisibleBy(options: DivisibleByOptions): PropertyDecorator;
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
export function DivisibleBy(value: number | bigint): PropertyDecorator;
/**
 * Creates a decorator that validates that the value is a number or bigint and is divisible by the given value.
 *
 * @internal This overload is only used for testing.
 */
export function DivisibleBy(
	value: number | bigint | DivisibleByOptions
): PropertyDecorator;
export function DivisibleBy(
	value: number | bigint | DivisibleByOptions
): PropertyDecorator {
	const options = createOptions(value);
	return createDecorator(
		createAssertion(options.divisibleBy),
		options.assertionEnabled
	);
}
