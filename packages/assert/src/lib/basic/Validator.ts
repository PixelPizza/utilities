import type { BaseValidator } from "@sapphire/shapeshift";
import { createDecorator } from "../utils";
import type { AssertionOptions } from "../Assertion";

/**
 * The options for {@link Validator}.
 * @since 1.1.0
 */
interface ValidatorOptions extends AssertionOptions {
	/**
	 * The validator to use.
	 */
	validator: BaseValidator<any>;
}

/**
 * Checks whether the given value is a valid {@link ValidatorOptions} object.
 * @param options The options to validate.
 * @returns Whether the given value is a valid {@link ValidatorOptions} object.
 *
 * @since 1.1.0
 */
function isOptions(options: unknown): options is ValidatorOptions {
	return Object.getPrototypeOf(options) === Object.prototype;
}

/**
 * Creates a {@link ValidatorOptions} object from the given value.
 * @param validatorOrOptions The validator or options to use.
 * @returns The created {@link ValidatorOptions} object.
 *
 * @since 1.1.0
 */
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
 * @param options The options to use.
 *
 * @throws {import("@sapphire/shapeshift").BaseError} Thrown if the decorated property is not valid.
 *
 * @since 1.1.0
 */
export function Validator(
	options: ValidatorOptions
): PropertyDecorator & ParameterDecorator;
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
 * @param validator The validator to use.
 *
 * @throws {import("@sapphire/shapeshift").BaseError} Thrown if the decorated property is not valid.
 *
 * @since 1.0.0
 */
export function Validator(
	validator: BaseValidator<any>
): PropertyDecorator & ParameterDecorator;
/**
 * Creates a decorator that validates the decorated property using the given validator.
 *
 * @internal This overload is only used for testing.
 */
export function Validator(
	options: BaseValidator<any> | ValidatorOptions
): PropertyDecorator & ParameterDecorator;
export function Validator(
	validatorOrOptions: BaseValidator<any> | ValidatorOptions
): PropertyDecorator & ParameterDecorator {
	const options = createOptions(validatorOrOptions);
	return createDecorator(options.validator, options.assertionEnabled);
}
