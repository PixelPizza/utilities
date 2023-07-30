import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function IsTrue(target: unknown, key: string): void {
	defineObjectPropertyWithAssertion(s.boolean.true, target, key);
}
