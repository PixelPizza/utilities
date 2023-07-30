import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function EqualTo(value: any): PropertyDecorator {
	return (target: unknown, key: string | symbol) => {
		defineObjectPropertyWithAssertion(
			s.literal(value),
			target,
			String(key)
		);
	};
}
