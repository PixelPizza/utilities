import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function DivisibleBy(value: number): PropertyDecorator {
	return (target: unknown, key: string | symbol) => {
		defineObjectPropertyWithAssertion(
			s.number.divisibleBy(value),
			target,
			String(key)
		);
	};
}
