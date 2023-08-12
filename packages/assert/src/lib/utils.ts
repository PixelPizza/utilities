import type { BaseValidator } from "@sapphire/shapeshift";
import { getGlobalAssertionEnabled } from "./configs";

export function createDecorator(
	validator: BaseValidator<any>,
	assertionEnabled?: boolean,
	modifyParseValue?: <T>(value: T) => T
): PropertyDecorator {
	return (target, key) => {
		defineObjectPropertyWithAssertion(
			validator,
			target,
			String(key),
			assertionEnabled,
			modifyParseValue
		);
	};
}

function defineObjectPropertyWithAssertion(
	assertion: BaseValidator<any>,
	target: unknown,
	key: string,
	assertionEnabled: boolean = getGlobalAssertionEnabled(),
	modifyParseValue?: <T>(value: T) => T
) {
	const property = Object.getOwnPropertyDescriptor(target, key);

	let value: any;

	Object.defineProperty(target, key, {
		get() {
			return value;
		},
		set(newValue) {
			if (assertionEnabled) {
				assertion.parse(
					modifyParseValue ? modifyParseValue(newValue) : newValue
				);
			}
			value = newValue;
			property?.set?.(newValue);
		},
		configurable: true
	});
}
