import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

function createAssertion(value: number | bigint) {
	if (typeof value === "bigint") return s.bigint.divisibleBy(value);
	return s.number.divisibleBy(value);
}

export function DivisibleBy(value: number | bigint): PropertyDecorator {
	return (target: unknown, key: string | symbol) => {
		defineObjectPropertyWithAssertion(
			createAssertion(value),
			target,
			String(key)
		);
	};
}
