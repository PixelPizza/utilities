import type { BaseValidator } from "@sapphire/shapeshift";

export function defineObjectPropertyWithAssertion(
	assertion: BaseValidator<any>,
	target: unknown,
	key: string
) {
	const property = Object.getOwnPropertyDescriptor(target, key);

	let value: any;

	Object.defineProperty(target, key, {
		get() {
			return value;
		},
		set(newValue) {
			assertion.parse(newValue);
			value = newValue;
			property?.set?.(newValue);
		},
		configurable: true
	});
}
