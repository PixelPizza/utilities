import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function SafeInt(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.number.safeInt, target, String(key));
}
