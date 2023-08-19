import { createAssertion } from "./Assertion";
import { createOptions, type RangeOptions } from "./RangeOptions";
import { createDecorator } from "../../utils";

/**
 * Creates a decorator that validates the decorated property is a number within the specified range.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Range({ min: 0, max: 10 })
 *   public value: number = 0;
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified range.
 *
 * @since 1.0.0
 */
export function Range(
	options: RangeOptions<number>
): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property is a bigint within the specified range.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Range({ min: 0n, max: 10n })
 *   public value: bigint = 0n;
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a bigint.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified range.
 *
 * @since 1.0.0
 */
export function Range(
	options: RangeOptions<bigint>
): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property is a number within the specified range.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Range(10)
 *   public value: number = 0;
 * }
 * ```
 *
 * @param max The maximum value allowed.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified range.
 *
 * @since 1.0.0
 */
export function Range(max: number): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property is a bigint within the specified range.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Range(10n)
 *   public value: bigint = 0n;
 * }
 * ```
 *
 * @param max The maximum value allowed.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a bigint.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified range.
 *
 * @since 1.0.0
 */
export function Range(max: bigint): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property is a number within the specified range.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Range(0, 10)
 *   public value: number = 0;
 * }
 * ```
 *
 * @param min The minimum value allowed.
 * @param max The maximum value allowed.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a number.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified range.
 *
 * @since 1.0.0
 */
export function Range(
	min: number,
	max: number
): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property is a bigint within the specified range.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Range(0n, 10n)
 *   public value: bigint = 0n;
 * }
 * ```
 *
 * @param min The minimum value allowed.
 * @param max The maximum value allowed.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a bigint.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified range.
 *
 * @since 1.0.0
 */
export function Range(
	min: bigint,
	max: bigint
): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property is a number or bigint within the specified range.
 *
 * @internal This overload is only used for testing
 */
export function Range<T extends number | bigint>(
	options: RangeOptions<T>
): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property is a number or bigint within the specified range.
 *
 * @internal This overload is only used for testing
 */
export function Range<T extends number | bigint>(
	max: T
): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property is a number or bigint within the specified range.
 *
 * @internal This overload is only used for testing
 */
export function Range<T extends number | bigint>(
	min: T,
	max: T
): PropertyDecorator & ParameterDecorator;
export function Range<T extends number | bigint>(
	options: T | RangeOptions<T>,
	max?: T
): PropertyDecorator & ParameterDecorator {
	return (target, key, parameterIndex?: number) => {
		const newOptions = createOptions(options, max);
		const assertion = createAssertion(newOptions);

		if (!assertion) return;

		createDecorator(assertion, newOptions.assertionEnabled)(
			target,
			key,
			parameterIndex!
		);
	};
}
