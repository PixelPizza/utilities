import "reflect-metadata";
import type { BaseValidator } from "@sapphire/shapeshift";

/**
 * Base assertion options.
 * @since 1.1.0
 */
export interface AssertionOptions {
	/**
	 * @default true
	 * @since 1.1.0
	 */
	assertionEnabled?: boolean;
}

const parameterAssertionMetadataKey = Symbol("parameterAssertion");

interface AssertionMapEntry {
	assertion: BaseValidator<any>;
	assertionEnabled?: boolean;
	modifyParseValue?: <T>(value: T) => T;
}

export function getParameterAssertionMap(
	target: NonNullable<unknown>,
	key: string | symbol
): Map<number, AssertionMapEntry[]> | undefined {
	return Reflect.getOwnMetadata(parameterAssertionMetadataKey, target, key);
}

export function addParameterAssertion(
	target: NonNullable<unknown>,
	key: string | symbol,
	parameterIndex: number,
	assertion: BaseValidator<any>,
	assertionEnabled?: boolean,
	modifyParseValue?: <T>(value: T) => T
) {
	const existingParametersAssertions: Map<number, AssertionMapEntry[]> =
		getParameterAssertionMap(target, key) ?? new Map();

	const existingParameterAssertions =
		existingParametersAssertions.get(parameterIndex) ?? [];

	existingParameterAssertions.push({
		assertion,
		assertionEnabled,
		modifyParseValue
	});
	existingParametersAssertions.set(
		parameterIndex,
		existingParameterAssertions
	);

	Reflect.defineMetadata(
		parameterAssertionMetadataKey,
		existingParametersAssertions,
		target,
		key
	);
}
