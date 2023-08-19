import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * The options for {@link Regex}.
 * @since 1.1.0
 */
interface RegexOptions extends AssertionOptions {
	/**
	 * The regular expression to match against.
	 */
	regex: RegExp;
}

/**
 * Creates the options for {@link Regex}.
 * @param options The options for {@link Regex}.
 * @returns The options for {@link Regex}.
 *
 * @since 1.1.0
 */
function createOptions(options: RegExp | RegexOptions): RegexOptions {
	return options instanceof RegExp ? { regex: options } : options;
}

/**
 * Creates a decorator that validates the decorated property is a string that matches the given regular expression.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Regex({ regex: /test/ })
 *   public value: string = "ateststring";
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property does not match the regular expression.
 *
 * @since 1.1.0
 */
export function Regex(
	options: RegexOptions
): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property is a string that matches the given regular expression.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Regex(/test/)
 *   public value: string = "ateststring";
 * }
 * ```
 *
 * @param regex The regular expression to match against.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property does not match the regular expression.
 *
 * @since 1.0.0
 */
export function Regex(regex: RegExp): PropertyDecorator & ParameterDecorator;
export function Regex(regexOrOptions: RegExp | RegexOptions) {
	const options = createOptions(regexOrOptions);
	return createDecorator(
		s.string.regex(options.regex),
		options.assertionEnabled
	);
}
