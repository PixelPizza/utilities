import { s, type UrlOptions } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

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
	if (key) {
		createDecorator(s.string.url())(options as NonNullable<unknown>, key);
		return;
	}

	return createDecorator(s.string.url(options as UrlOptions));
}
