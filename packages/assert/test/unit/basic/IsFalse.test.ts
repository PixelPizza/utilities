import Assert from "../../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("IsFalse tests", () => {
	test("GIVEN false THEN does not throw", () => {
		class TestClass {
			@Assert.IsFalse
			public testAttribute = false;
		}

		expect(() => new TestClass()).not.toThrow();
	});

	test.each([
		{
			value: true,
			error: new ExpectedConstraintError(
				"s.boolean.false",
				"Invalid boolean value",
				true,
				"false"
			)
		},
		{
			value: null,
			error: new ValidationError(
				"s.boolean",
				"Expected a boolean primitive",
				null
			)
		}
	])(`GIVEN $value THEN throws $error`, ({ value, error }) => {
		class TestClass {
			@Assert.IsFalse
			public testAttribute = value;
		}

		expect(() => new TestClass()).toThrow(error);
	});
});
