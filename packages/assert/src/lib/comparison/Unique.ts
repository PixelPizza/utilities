import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function Unique(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.any.array.unique, target, String(key));
}
