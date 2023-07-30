import { s, type StringUuidOptions } from "@sapphire/shapeshift";
import { defineObjectPropertyWithAssertion } from "../utils";

export function Uuid(options: StringUuidOptions): PropertyDecorator;
export function Uuid(target: unknown, key: string | symbol): void;
export function Uuid(
	options: unknown | StringUuidOptions,
	key?: string | symbol
): PropertyDecorator | void {
	function decorate(
		target: unknown,
		key: string,
		options?: StringUuidOptions
	) {
		defineObjectPropertyWithAssertion(
			s.string.uuid(options),
			target,
			String(key)
		);
	}

	if (key) {
		return decorate(options, String(key));
	}

	return (target: unknown, key: string | symbol) => {
		decorate(target, String(key), options as StringUuidOptions);
	};
}
