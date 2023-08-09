import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

interface RangeOptions {
	min?: number;
	max?: number;
	equal?: number;
	notEqual?: number;
	greaterThan?: number;
	lessThan?: number;
}

export function Range(options: RangeOptions): PropertyDecorator;
export function Range(max: number): PropertyDecorator;
export function Range(min: number, max: number): PropertyDecorator;
export function Range(
	options: number | RangeOptions,
	max?: number
): PropertyDecorator {
	return (target: unknown, key: string | symbol) => {
		function createOptions(options: number | RangeOptions, max?: number) {
			if (typeof options === "number") {
				return max ? { min: options, max } : { max: options };
			}

			return options;
		}

		function createAssertion() {
			const newOptions = createOptions(options, max);

			let assertion = s.number;

			if (newOptions.min) {
				assertion = assertion.greaterThanOrEqual(newOptions.min);
			}

			if (newOptions.max) {
				assertion = assertion.lessThanOrEqual(newOptions.max);
			}

			if (newOptions.equal) {
				assertion = assertion.equal(newOptions.equal);
			}

			if (newOptions.notEqual) {
				assertion = assertion.notEqual(newOptions.notEqual);
			}

			if (newOptions.greaterThan) {
				assertion = assertion.greaterThan(newOptions.greaterThan);
			}

			if (newOptions.lessThan) {
				assertion = assertion.lessThan(newOptions.lessThan);
			}

			return assertion;
		}

		defineObjectPropertyWithAssertion(
			createAssertion(),
			target,
			String(key)
		);
	};
}
