import type { BaseValidator } from "@sapphire/shapeshift";
import { getGlobalAssertionEnabled } from "./configs";
import { addParameterAssertion } from "./Assertion";
import { s } from "@sapphire/shapeshift";

/**
 * Creates a decorator for a property.
 * @param validator The validator to use.
 * @param assertionEnabled Whether the assertion is enabled.
 * @param modifyParseValue A function to modify the value before parsing.
 */
export function createPropertyDecorator(
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
 * Creates a decorator for a parameter.
 * @param validator The validator to use.
 * @param assertionEnabled Whether the assertion is enabled.
 * @param modifyParseValue A function to modify the value before parsing.
 */
export function createParameterDecorator(
	validator: BaseValidator<any>,
	assertionEnabled?: boolean,
	modifyParseValue?: <T>(value: T) => T
): ParameterDecorator {
	return (target, key, parameterIndex) => {
		if (key) {
			addParameterAssertion(
				target,
				key,
				parameterIndex,
				validator,
				assertionEnabled,
				modifyParseValue
			);
		}
	};
}

export function createDecorator(
	validator: BaseValidator<any>,
	assertionEnabled?: boolean,
	modifyParseValue?: <T>(value: T) => T
): ParameterDecorator & PropertyDecorator {
	return (
		target: NonNullable<unknown>,
		key?: string | symbol,
		parameterIndex?: number
	) => {
		if (isParameterDecorator(target, key, parameterIndex)) {
			return createParameterDecorator(
				validator,
				assertionEnabled,
				modifyParseValue
			)(target, key, parameterIndex);
		}
		if (isPropertyDecorator(target, key, parameterIndex)) {
			return createPropertyDecorator(
				validator,
				assertionEnabled,
				modifyParseValue
			)(target, key);
		}
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
	assertionEnabled?: boolean,
	modifyParseValue?: <T>(value: T) => T
) {
	const property = Object.getOwnPropertyDescriptor(target, key);

	let value: any;

	Object.defineProperty(target, key, {
		get() {
			return value;
		},
		set(newValue) {
			parseAssertion(
				assertion,
				modifyParseValue ? modifyParseValue(newValue) : newValue,
				assertionEnabled
			);
			value = newValue;
			property?.set?.(newValue);
		},
		configurable: true
	});
}

export function parseAssertion(
	assertion: BaseValidator<any>,
	value: any,
	enabled?: boolean
) {
	if (enabled ?? getGlobalAssertionEnabled()) {
		assertion.parse(value);
	}
}

function isPropertyDecorator(
	target: NonNullable<unknown>,
	key?: string | symbol,
	parameterIndex?: number
): key is string | symbol {
	return s
		.object({
			target: s.any,
			key: s.string.or(s.literal(Symbol)),
			parameterIndex: s.undefined
		})
		.is({
			target,
			key: typeof key === "symbol" ? key.constructor : key,
			parameterIndex
		});
}

function isParameterDecorator(
	target: NonNullable<unknown>,
	key?: string | symbol,
	parameterIndex?: number
): parameterIndex is number {
	return s
		.object({
			target: s.any,
			key: s.string.or(s.literal(Symbol)).optional,
			parameterIndex: s.number
		})
		.is({
			target,
			key: typeof key === "symbol" ? key.constructor : key,
			parameterIndex
		});
}
