import { defineObjectPropertyWithAssertion } from "../../utils";
import { createAssertion } from "./Assertion";
import { createOptions, type RangeOptions } from "./RangeOptions";

export function Range(options: RangeOptions<number>): PropertyDecorator;
export function Range(options: RangeOptions<bigint>): PropertyDecorator;
export function Range(max: number): PropertyDecorator;
export function Range(max: bigint): PropertyDecorator;
export function Range(min: number, max: number): PropertyDecorator;
export function Range(min: bigint, max: bigint): PropertyDecorator;
export function Range<T extends number | bigint>(
	options: T | RangeOptions<T>,
	max?: T
): PropertyDecorator {
	return (target: unknown, key: string | symbol) => {
		const newOptions = createOptions(options, max);
		const assertion = createAssertion(newOptions);

		if (!assertion) return;

		defineObjectPropertyWithAssertion(assertion, target, String(key));
	};
}
