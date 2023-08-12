import { Assert } from "../../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("DivisibleBy tests", () => {
	test.each<[number | bigint, Parameters<typeof Assert.DivisibleBy>[0]]>([
		[10, 2],
		[10, 5],
		[10, 10],
		[10, 1],
		[10, 0.5],
		[4, 2],
		[4, 1],
		[4, 0.5],
		[4, 0.25],
		[85, 5],
		[85, 1],
		[10n, 2n],
		[10n, 5n],
		[10n, 10n],
		[10n, 1n],
		[4n, 2n],
		[4n, 1n],
		[85n, 5n],
		[85n, 1n],
		[85n, { divisibleBy: 1n, assertionEnabled: false }]
	])("GIVEN %s is divisible by %s THEN does not throw", (value, divisor) => {
		class Test {
			@Assert.DivisibleBy(divisor)
			public value = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each<[number | bigint, Parameters<typeof Assert.DivisibleBy>[0]]>([
		[11, 2],
		[11, 5],
		[11, 10],
		[11, 0.33],
		[3, 2],
		[85, 2],
		[85, 3],
		[85, 4],
		[11n, 2n],
		[11n, 5n],
		[11n, 10n],
		[3n, 2n],
		[85n, 2n],
		[85n, 3n],
		[85n, 4n]
	])("GIVEN %s is not divisible by %s THEN throws", (value, options) => {
		class Test {
			@Assert.DivisibleBy(options)
			public value = value;
		}

		const divisor =
			typeof options === "number" || typeof options === "bigint"
				? options
				: options.divisibleBy;
		const isDivisorNumber = typeof divisor === "number";
		const expectedValueSuffix = isDivisorNumber ? "" : "n";

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				`s.${isDivisorNumber ? "number" : "bigint"}.divisibleBy`,
				`${isDivisorNumber ? "Number" : "BigInt"} is not divisible`,
				value,
				`expected % 2${expectedValueSuffix} === 0${expectedValueSuffix}`
			)
		);
	});
});
