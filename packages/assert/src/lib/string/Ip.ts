import { s } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";

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
export function Ip(target: unknown, key: string | symbol): void;
export function Ip(
	targetOrVersion: unknown | 4 | 6,
	key?: string | symbol
): PropertyDecorator | void {
	if (typeof targetOrVersion === "number") {
		return createDecorator(s.string.ip(targetOrVersion as 4 | 6));
	}

	createDecorator(s.string.ip())(
		targetOrVersion as NonNullable<unknown>,
		key!
	);
}
