import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

export function Date(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.string.date, target, String(key));
}
