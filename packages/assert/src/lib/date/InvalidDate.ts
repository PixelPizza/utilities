import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function InvalidDate(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.date.invalid, target, String(key));
}
