import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

export function Regex(regex: RegExp): PropertyDecorator {
	return (target: unknown, key: string | symbol) => {
		defineObjectPropertyWithAssertion(
			s.string.regex(regex),
			target,
			String(key)
		);
	};
}
