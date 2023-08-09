import { Assert } from "../../../src/index";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("EqualTo tests", () => {
	test.each([
		1,
		"1",
		true,
		false,
		null,
		undefined,
		Symbol("1"),
		{},
		() => {}
	])("GIVEN %o THEN does not throw", (value: unknown) => {
		class Test {
			@Assert.EqualTo(value)
			public value = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each([
		[1, "1"],
		[1, 2],
		["1", "2"],
		[1, true],
		[false, "0"],
		[true, false],
		[null, undefined],
		[Symbol("1"), Symbol("2")]
	])("GIVEN %o, %o THEN throws", (value: unknown, expected: unknown) => {
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
