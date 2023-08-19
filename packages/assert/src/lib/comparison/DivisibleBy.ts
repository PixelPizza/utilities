import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * Creates the assertion for the given value.
 * @param value The value to be used in the assertion.
 * @returns The assertion.
 *
 * @since 1.0.0
 */
function createAssertion(value: number | bigint) {
	if (typeof value === "bigint") return s.bigint.divisibleBy(value);
	return s.number.divisibleBy(value);
}

/**
 * The options for {@link DivisibleBy}.
 * @since 1.1.0
 */
interface DivisibleByOptions extends AssertionOptions {
	/**
	 * The value must be divisible by the given value.
	 */
	divisibleBy: number | bigint;
}

/**
 * Creates the options for {@link DivisibleBy}.
 * @param value The value to be used in the assertion.
 * @returns The options.
 *
 * @since 1.1.0
 */
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
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number or bigint.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not divisible by the given value.
 *
 * @since 1.1.0
 */
export function DivisibleBy(
	options: DivisibleByOptions
): PropertyDecorator & ParameterDecorator;
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
 * @param value The value to be used in the assertion.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number or bigint.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not divisible by the given value.
 *
 * @since 1.0.0
 */
export function DivisibleBy(
	value: number | bigint
): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates that the value is a number or bigint and is divisible by the given value.
 *
 * @internal This overload is only used for testing.
 */
export function DivisibleBy(
	value: number | bigint | DivisibleByOptions
): PropertyDecorator & ParameterDecorator;
export function DivisibleBy(
	value: number | bigint | DivisibleByOptions
): PropertyDecorator & ParameterDecorator {
	const options = createOptions(value);
	return createDecorator(
		createAssertion(options.divisibleBy),
		options.assertionEnabled
	);
}
