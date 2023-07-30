import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function Email(target: unknown, key: string): void {
	defineObjectPropertyWithAssertion(s.string.email, target, key);
}
