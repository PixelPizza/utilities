import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

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
) {
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
) {
	let modifyParseValue;
	if (type === "symbol") {
		modifyParseValue = (value: any) => value.constructor;
	} else if (type === "object") {
		modifyParseValue = (value: any) => typeof value;
	}
	return modifyParseValue;
}

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
) {
	return createDecorator(getTypeAssertion(type), getParseValueModifier(type));
}
