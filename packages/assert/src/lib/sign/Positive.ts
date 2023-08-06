import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

export function Positive(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(
		s.number.positive.or(s.bigint.positive),
		target,
		String(key)
	);
}
