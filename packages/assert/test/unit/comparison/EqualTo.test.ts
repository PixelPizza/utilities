import { Assert } from "../../../src/index";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("EqualTo tests", () => {
	const symbol = Symbol("1");
	const emptyObject = {};
	const functionObject = () => {};

	test.each<[unknown, Parameters<typeof Assert.EqualTo>[0]]>([
		[1, 1],
		["1", "1"],
		[true, true],
		[false, false],
		[null, null],
		[undefined, undefined],
		[symbol, symbol],
		[emptyObject, emptyObject],
		[functionObject, functionObject],
		[1, { equalTo: 2, assertionEnabled: false }]
	])("GIVEN %o with options %o THEN does not throw", (value, options) => {
		class Test {
			@Assert.EqualTo(options)
			public value = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each<[unknown, Parameters<typeof Assert.EqualTo>[0]]>([
		[1, "1"],
		[1, 2],
		["1", "2"],
		[1, true],
		[false, "0"],
		[true, false],
		[null, undefined],
		[Symbol("1"), Symbol("2")]
	])("GIVEN %o, %o THEN throws", (value, expected) => {
		class Test {
			@Assert.EqualTo(expected)
			public value = value;
		}

		expect(() => new Test()).toThrow(
			new ExpectedValidationError(
				"s.literal(V)",
				"Expected values to be equals",
				value,
				expected
			)
		);
	});
});
