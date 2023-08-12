import type { BaseValidator } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

interface ValidatorOptions extends AssertionOptions {
	/**
	 * The validator to use.
	 */
	validator: BaseValidator<any>;
}

function isOptions(options: unknown): options is ValidatorOptions {
	return Object.getPrototypeOf(options) === Object.prototype;
}

function createOptions(
	validatorOrOptions: BaseValidator<any> | ValidatorOptions
): ValidatorOptions {
	return isOptions(validatorOrOptions)
		? validatorOrOptions
		: { validator: validatorOrOptions };
}

/**
 * Creates a decorator that validates the decorated property using the given validator.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Validator({ validator: s.string.array })
 *   public value: string[] = ["a string"];
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").BaseError} Thrown if the decorated property is not valid.
 *
 * @since 1.1.0
 */
export function Validator(options: ValidatorOptions): PropertyDecorator;
/**
 * Creates a decorator that validates the decorated property using the given validator.
 *
 * @example
 * ```typescript
 * class Example {
 *   @Validator(s.string.array)
 *   public value: string[] = ["a string"];
 * }
 * ```
 *
 * @throws {import("@sapphire/shapeshift").BaseError} Thrown if the decorated property is not valid.
 *
 * @since 1.0.0
 */
export function Validator(validator: BaseValidator<any>): PropertyDecorator;
/**
 * Creates a decorator that validates the decorated property using the given validator.
 *
 * @internal This overload is only used for testing.
 */
export function Validator(
	options: BaseValidator<any> | ValidatorOptions
): PropertyDecorator;
export function Validator(
	validatorOrOptions: BaseValidator<any> | ValidatorOptions
): PropertyDecorator {
	const options = createOptions(validatorOrOptions);
	return createDecorator(options.validator, options.assertionEnabled);
}
