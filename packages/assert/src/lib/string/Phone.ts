import { s } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

export function Phone(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.string.phone(), target, String(key));
}
