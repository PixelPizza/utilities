import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

interface LengthOptions {
	min?: number;
	max?: number;
	equal?: number;
	greaterThan?: number;
	lessThan?: number;
	notEqual?: number;
}

export function Length(options: LengthOptions): PropertyDecorator;
export function Length(max: number): PropertyDecorator;
export function Length(min: number, max: number): PropertyDecorator;
export function Length(
	options: number | LengthOptions,
	max?: number
): PropertyDecorator {
	return (target: unknown, key: string | symbol) => {
		function createOptions(options: number | LengthOptions, max?: number) {
			if (typeof options === "number") {
				return max ? { min: options, max } : { max: options };
			}

			return options;
		}

		function createAssertion() {
			const newOptions = createOptions(options, max);

			let assertion = s.string;

			if (newOptions.min) {
				assertion = assertion.lengthGreaterThanOrEqual(newOptions.min);
			}

			if (newOptions.max) {
				assertion = assertion.lengthLessThanOrEqual(newOptions.max);
			}

			if (newOptions.equal) {
				assertion = assertion.lengthEqual(newOptions.equal);
			}

			if (newOptions.greaterThan) {
				assertion = assertion.lengthGreaterThan(newOptions.greaterThan);
			}

			if (newOptions.lessThan) {
				assertion = assertion.lengthLessThan(newOptions.lessThan);
			}

			if (newOptions.notEqual) {
				assertion = assertion.lengthNotEqual(newOptions.notEqual);
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
