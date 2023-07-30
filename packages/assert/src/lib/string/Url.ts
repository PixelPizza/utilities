import { defineObjectPropertyWithAssertion } from "../utils";
import { s, type UrlOptions } from "@sapphire/shapeshift";

export function Url(target: unknown, key: string | symbol): void;
export function Url(options: UrlOptions): PropertyDecorator;
export function Url(
	options: UrlOptions | unknown,
	key?: string | symbol
): PropertyDecorator | void {
	function decorate(target: unknown, key: string, options?: UrlOptions) {
		defineObjectPropertyWithAssertion(s.string.url(options), target, key);
	}

	if (key) {
		decorate(options, String(key));
		return;
	}

	return (target: unknown, key: string | symbol) => {
		decorate(target, String(key), options as UrlOptions);
	};
}
