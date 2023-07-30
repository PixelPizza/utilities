import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function Finite(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.number.finite, target, String(key));
}
