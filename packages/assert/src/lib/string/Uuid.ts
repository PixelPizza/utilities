import {
	s,
	type StringUuidOptions as ShapeShiftStringUuidOptions
} from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * The options for {@link Uuid}.
 * @since 1.0.0
 */
interface StringUuidOptions
	extends ShapeShiftStringUuidOptions,
		AssertionOptions {}

/**
 * A decorator that validates the decorated property is a string and a valid uuid v4
 *
 * @example
 * ```typescript
 * class Example {
 *   @Uuid
 *   public uuid: string = "ae1a26c4-c813-459d-9095-4ddf908ab514";
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a valid uuid v4.
 *
 * @since 1.0.0
 */
export function Uuid(target: unknown, key: string | symbol): void;
/**
 * A decorator that validates the decorated property is a string and a valid uuid
 *
 * @example
 * ```typescript
 * class Example {
 *   @Uuid({ version: 5 })
 *   public uuid: string = "3e91af1e-f7e6-54cd-808f-1448ac9cb7ff";
 * }
 * ```
 *
 * @param options The options for the decorator.
 *
 * @throws {import("@sapphire/shapeshift").ValidationError} Thrown if the decorated property is not a string.
 * @throws {import("@sapphire/shapeshift").ExpectedConstraintError} Thrown if the decorated property is not a valid uuid.
 *
 * @since 1.0.0
 */
export function Uuid(options: StringUuidOptions): PropertyDecorator;
export function Uuid(
	options: unknown | StringUuidOptions,
	key?: string | symbol
): PropertyDecorator | void {
	if (key) {
		return createDecorator(s.string.uuid())(
			options as NonNullable<unknown>,
			key
		);
	}

	return createDecorator(
		s.string.uuid(options as StringUuidOptions),
		(options as StringUuidOptions).assertionEnabled
	);
}
