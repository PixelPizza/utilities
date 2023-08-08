import { defineObjectPropertyWithAssertion } from "../utils";
import { s, type UrlOptions } from "@sapphire/shapeshift";

/**
 * A decorator that validates the decorated property is a string and a valid url
 *
 * @example
 * ```typescript
 * class Example {
 *   @Url
 *   public url: string = "https://example.com";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a valid url.
 *
 * @since 1.0.0
 */
export function Url(target: unknown, key: string | symbol): void;
/**
 * Creates a decorator that validates the decorated property is a string and a valid url
 *
 * @example
 * ```typescript
 * class Example {
 *   @Url({ allowedProtocols: ["https:"], allowedDomains: ["example.com"] })
 *   public url: string = "https://example.com";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a valid url.
 *
 * @since 1.0.0
 */
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
