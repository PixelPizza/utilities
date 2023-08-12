import { BaseValidator, s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * Gets the assertion for the given type.
 * @param type The type to assert.
 * @returns The assertion for the given type.
 *
 * @since 1.0.0
 */
function getTypeAssertion(
	type:
		| "string"
		| "number"
		| "bigint"
		| "boolean"
		| "symbol"
		| "undefined"
		| "object"
		| "function"
): BaseValidator<any> {
	switch (type) {
		case "string":
			return s.string;
		case "number":
			return s.number;
		case "bigint":
			return s.bigint;
		case "boolean":
			return s.boolean;
		case "symbol":
			return s.literal(Symbol);
		case "undefined":
			return s.undefined;
		case "object":
			return s.literal("object");
		case "function":
			return s.instance(Function);
	}
}

/**
 * Gets the modifier for the given type.
 * @param type The type to assert.
 * @returns The modifier for the given type.
 *
 * @since 1.0.0
 */
function getParseValueModifier(
	type:
		| "string"
		| "number"
		| "bigint"
		| "boolean"
		| "symbol"
		| "undefined"
		| "object"
		| "function"
): ((value: any) => any) | undefined {
	let modifyParseValue;
	if (type === "symbol") {
		modifyParseValue = (value: any) => value.constructor;
	} else if (type === "object") {
		modifyParseValue = (value: any) => typeof value;
	}
	return modifyParseValue;
}

/**
 * The options for the {@link Type} decorator.
 *
 * @since 1.1.0
 */
interface TypeOptions extends AssertionOptions {
	/**
	 * The type to assert.
	 */
	type:
		| "string"
		| "number"
		| "bigint"
		| "boolean"
		| "symbol"
		| "undefined"
		| "object"
		| "function";
}

/**
 * Creates the options for the decorator.
 * @param typeOrOptions The type or options for the decorator.
 * @returns The options for the decorator.
 *
 * @since 1.1.0
 */
function createOptions(
	typeOrOptions:
		| "string"
		| "number"
		| "bigint"
		| "boolean"
		| "symbol"
		| "undefined"
		| "object"
		| "function"
		| TypeOptions
) {
	return typeof typeOrOptions === "string"
		? { type: typeOrOptions }
		: typeOrOptions;
}

/**
 * Creates a decorator that validates the decorated property is of the given type.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Type({ type: "string" })
 *   public email: string = "a string";
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").BaseError} Thrown if the decorated property is not of the given type.
 *
 * @since 1.1.0
 */
export function Type(options: TypeOptions): PropertyDecorator;
/**
 * Creates a decorator that validates the decorated property is of the given type.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Type("string")
 *   public email: string = "a string";
 * }
 * ```
 *
 * @param type The type to assert.
 *
 * @throws {import("@sapphire/shapeshift").BaseError} Thrown if the decorated property is not of the given type.
 *
 * @since 1.0.0
 */
export function Type(
	type:
		| "string"
		| "number"
		| "bigint"
		| "boolean"
		| "symbol"
		| "undefined"
		| "object"
		| "function"
): PropertyDecorator;
/**
 * Creates a decorator that validates the decorated property is of the given type.
 *
 * @internal This overload is only used for testing.
 */
export function Type(
	options:
		| "string"
		| "number"
		| "bigint"
		| "boolean"
		| "symbol"
		| "undefined"
		| "object"
		| "function"
		| TypeOptions
): PropertyDecorator;
export function Type(
	typeOrOptions:
		| "string"
		| "number"
		| "bigint"
		| "boolean"
		| "symbol"
		| "undefined"
		| "object"
		| "function"
		| TypeOptions
) {
	const options = createOptions(typeOrOptions);
	return createDecorator(
		getTypeAssertion(options.type),
		options.assertionEnabled,
		getParseValueModifier(options.type)
	);
}
