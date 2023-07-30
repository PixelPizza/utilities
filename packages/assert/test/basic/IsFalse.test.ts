import Assert from "../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("IsFalse tests", () => {
	test("GIVEN false THEN does not throw", () => {
		class TestClass {
			@Assert.IsFalse
			public testAttribute = false;
		}

		expect(() => new TestClass()).not.toThrow();
	});

	test("GIVEN true THEN throws", () => {
		class TestClass {
			@Assert.IsFalse
			public testAttribute = true;
		}

		expect(() => new TestClass()).toThrow(
			new ExpectedConstraintError(
				"s.boolean.true",
				"Invalid boolean value",
				true,
				"false"
			)
		);
	});

	test("GIVEN null THEN throws", () => {
		class TestClass {
			@Assert.IsFalse
			public testAttribute = null;
		}

		expect(() => new TestClass()).toThrow(
			new ValidationError(
				"s.boolean",
				"Expected a boolean primitive",
				null
			)
		);
	});
});
