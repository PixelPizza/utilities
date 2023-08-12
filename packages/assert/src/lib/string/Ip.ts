import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

interface IpOptions extends AssertionOptions {
	/**
	 * The ip version to validate against.
	 */
	version?: 4 | 6;
}

/**
 * Creates a decorator that validates the decorated property is a valid ip-address.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Ip({ version: 4 })
 *   public email: string = "192.168.0.0";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an ip-address or is not the right ip version.
 *
 * @since 1.1.0
 */
export function Ip(options: IpOptions): PropertyDecorator;
/**
 * Creates a decorator that validates the decorated property is a valid ip-address.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Ip(4)
 *   public email: string = "192.168.0.0";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an ip-address or is not the right ip version.
 *
 * @since 1.0.0
 */
export function Ip(version: 4 | 6): PropertyDecorator;
/**
 * A decorator that validates the decorated property is a valid ip-address.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Ip
 *   public email: string = "192.168.0.0";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not an ip-address.
 *
 * @since 1.0.0
 */
export function Ip(target: NonNullable<unknown>, key: string | symbol): void;
export function Ip(
	targetOrVersion: NonNullable<unknown> | 4 | 6 | IpOptions,
	key?: string | symbol
) {
	if (typeof targetOrVersion === "number") {
		return createDecorator(s.string.ip(targetOrVersion as 4 | 6));
	}

	if (key) {
		return createDecorator(s.string.ip())(targetOrVersion, key);
	}

	return createDecorator(
		s.string.ip((targetOrVersion as IpOptions).version),
		(targetOrVersion as IpOptions).assertionEnabled
	);
}
