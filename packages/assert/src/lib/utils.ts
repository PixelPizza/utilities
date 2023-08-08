import type { BaseValidator } from "@sapphire/shapeshift";

export function defineObjectPropertyWithAssertion(
	assertion: BaseValidator<any>,
	target: unknown,
	key: string,
	modifyParseValue?: <T>(value: T) => T
) {
	const property = Object.getOwnPropertyDescriptor(target, key);

	let value: any;

	Object.defineProperty(target, key, {
		get() {
			return value;
		},
		set(newValue) {
			assertion.parse(
				modifyParseValue ? modifyParseValue(newValue) : newValue
			);
			value = newValue;
			property?.set?.(newValue);
		},
		configurable: true
	});
}
