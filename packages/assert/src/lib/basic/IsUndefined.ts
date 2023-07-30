import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function IsUndefined(target: unknown, key: string): void {
	defineObjectPropertyWithAssertion(s.undefined, target, key);
}
