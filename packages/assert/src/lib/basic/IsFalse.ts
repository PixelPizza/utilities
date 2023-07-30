import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function IsFalse(target: unknown, key: string): void {
	defineObjectPropertyWithAssertion(s.boolean.false, target, key);
}
