import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

type DateLike = Date | string | number;

interface DateRangeOptions {
	min?: Date | string | number;
	max?: Date | string | number;
	equal?: Date | string | number;
	notEqual?: Date | string | number;
	greaterThan?: Date | string | number;
	lessThan?: Date | string | number;
}

export function DateRange(options: DateRangeOptions): PropertyDecorator;
export function DateRange(max: Date | string | number): PropertyDecorator;
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

		defineObjectPropertyWithAssertion(
			createAssertion(createOptions(options, max)),
			target,
			String(key)
		);
	};
}
