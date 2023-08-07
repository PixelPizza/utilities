import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function ValidDate(target: unknown, key: string | symbol): void {
	defineObjectPropertyWithAssertion(s.date.valid, target, String(key));
}
