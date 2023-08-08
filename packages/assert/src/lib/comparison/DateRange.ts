import { s } from "@sapphire/shapeshift";
import { Validator } from "../basic/Validator";

type DateLike = Date | string | number;

interface DateRangeOptions {
	/**
	 * The value must be greater than or equal to the given date.
	 */
	min?: Date | string | number;
	/**
	 *
	 * The value must be less than or equal to the given date.
	 */
	max?: Date | string | number;
	/**
	 * The value must be equal to the given date.
	 */
	equal?: Date | string | number;
	/**
	 * The value must not be equal to the given date.
	 */
	notEqual?: Date | string | number;
	/**
	 * The value must be greater than the given date.
	 */
	greaterThan?: Date | string | number;
	/**
	 * The value must be less than the given date.
	 */
	lessThan?: Date | string | number;
}

/**
 * Creates a decorator that validates the decorated property is a date within the specified range.
 *
 * @example
 * ```typescript
 * class Example {
 *   @DateRange({ min: new Date("2020-01-01"), max: new Date("2020-12-31") })
 *   public date: Date = new Date("2020-06-01");
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a date.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified range.
 *
 * @since 1.0.0
 */
export function DateRange(options: DateRangeOptions): PropertyDecorator;
/**
 * Creates a decorator that validates the decorated property is a date within the specified range.
 *
 * @example
 * ```typescript
 * class Example {
 *   @DateRange(new Date("2020-12-31"))
 *   public date: Date = new Date("2020-06-01");
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a date.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified range.
 *
 * @since 1.0.0
 */
export function DateRange(max: Date | string | number): PropertyDecorator;
/**
 * Creates a decorator that validates the decorated property is a date within the specified range.
 *
 * @example
 * ```typescript
 * class Example {
 *   @DateRange(new Date("2020-01-01"), new Date("2020-12-31"))
 *   public date: Date = new Date("2020-06-01");
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a date.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not within the specified range.
 *
 * @since 1.0.0
 */
export function DateRange(
	min: Date | string | number,
	max: Date | string | number
): PropertyDecorator;
export function DateRange(
	options: DateLike | DateRangeOptions,
	max?: DateLike
): PropertyDecorator {
	return (target: unknown, key: string | symbol) => {
		function createOptions(
			options?: DateLike | DateRangeOptions,
			max?: DateLike
		): DateRangeOptions {
			if (typeof options !== "object" || options instanceof Date) {
				return max ? { min: options, max } : { max: options };
			}
			return options;
		}

		function createAssertion(options: DateRangeOptions) {
			let assertion = s.date;

			if (options.min) {
				assertion = assertion.greaterThanOrEqual(options.min);
			}

			if (options.max) {
				assertion = assertion.lessThanOrEqual(options.max);
			}

			if (options.equal) {
				assertion = assertion.equal(options.equal);
			}

			if (options.notEqual) {
				assertion = assertion.notEqual(options.notEqual);
			}

			if (options.greaterThan) {
				assertion = assertion.greaterThan(options.greaterThan);
			}

			if (options.lessThan) {
				assertion = assertion.lessThan(options.lessThan);
			}

			return assertion;
		}

		const assertion = createAssertion(createOptions(options, max));
		Validator(assertion)(target as NonNullable<unknown>, key);
	};
}
