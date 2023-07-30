import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function IsNull(target: unknown, key: string): void {
	defineObjectPropertyWithAssertion(s.null, target, key);
}
