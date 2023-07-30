import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

export function Negative(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.number.negative, target, String(key));
}
