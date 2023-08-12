import type { BaseValidator } from "@sapphire/shapeshift";
import { getGlobalAssertionEnabled } from "./configs";

/**
 * Creates a decorator for a property.
 * @param validator The validator to use.
 * @param assertionEnabled Whether the assertion is enabled.
 * @param modifyParseValue A function to modify the value before parsing.
 */
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

/**
 * Defines an object property with an assertion.
 * @param assertion The assertion to use.
 * @param target The target object.
 * @param key The key of the property.
 * @param assertionEnabled Whether the assertion is enabled.
 * @param modifyParseValue A function to modify the value before parsing.W
 */
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
