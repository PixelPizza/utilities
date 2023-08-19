import { getParameterAssertionMap } from "../Assertion";
import { parseAssertion } from "../utils";

/**
 * @since 1.2.0
 */
export function ValidateParameters(
	target: NonNullable<unknown>,
	name: string,
	descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
) {
	const method = descriptor.value!;

	descriptor.value = function value(...args: any[]) {
		const parameterAssertionMap = getParameterAssertionMap(target, name);
		if (parameterAssertionMap) {
			for (const [index, assertions] of parameterAssertionMap) {
				for (const {
					assertion,
					assertionEnabled,
					modifyParseValue
				} of assertions) {
					parseAssertion(
						assertion,
						modifyParseValue
							? modifyParseValue(args[index])
							: args[index],
						assertionEnabled
					);
				}
			}
		}
		return method.apply(this, args);
	};
}
