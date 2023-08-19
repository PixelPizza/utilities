import {
	s,
	type UrlOptions as ShapeShiftUrlOptions
} from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * The options for {@link Url}.
 * @since 1.0.0
 */
interface UrlOptions extends ShapeShiftUrlOptions, AssertionOptions {}

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
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a valid url.
 *
 * @since 1.0.0
 */
export function Url(
	options: UrlOptions
): PropertyDecorator & ParameterDecorator;
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
export function Url(
	target: NonNullable<unknown>,
	key: string | symbol,
	parameterIndex?: number
): void;
export function Url(
	options: UrlOptions | NonNullable<unknown>,
	key?: string | symbol,
	parameterIndex?: number
): PropertyDecorator | void {
	if (key || parameterIndex !== undefined) {
		createDecorator(s.string.url())(
			options as NonNullable<unknown>,
			key,
			parameterIndex!
		);
		return;
	}

	return createDecorator(
		s.string.url(options as UrlOptions),
		(options as UrlOptions).assertionEnabled
	);
}
