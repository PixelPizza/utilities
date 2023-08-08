import Assert from "../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("IsTrue tests", () => {
	test("GIVEN true THEN does not throw", () => {
		class TestClass {
			@Assert.IsTrue
			public testAttribute = true;
		}

		expect(() => new TestClass()).not.toThrow();
	});

	test.each([
		{
			value: false,
			error: new ExpectedConstraintError(
				"s.boolean.true",
				"Invalid boolean value",
				false,
				"true"
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
			@Assert.IsTrue
			public testAttribute = value;
		}

		expect(() => new TestClass()).toThrow(error);
	});
});
