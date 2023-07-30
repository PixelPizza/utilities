import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function Int(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.number.int, target, String(key));
}
