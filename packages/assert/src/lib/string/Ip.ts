import { defineObjectPropertyWithAssertion } from "../utils";
import { s } from "@sapphire/shapeshift";

export function Ip(version: 4 | 6): PropertyDecorator;
export function Ip(target: unknown, key: string | symbol): void;
export function Ip(
	targetOrVersion: unknown | 4 | 6,
	key?: string | symbol
): PropertyDecorator | void {
	function decorate(target: unknown, key: string, version?: 4 | 6) {
		defineObjectPropertyWithAssertion(s.string.ip(version), target, key);
	}

	if (typeof targetOrVersion === "number") {
		return (target: unknown, key: string | symbol) => {
			decorate(target, String(key), targetOrVersion as 4 | 6);
		};
	}

	decorate(targetOrVersion, String(key!));
}
