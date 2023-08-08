import Assert from "../../../src";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("IsUndefined tests", () => {
	test("GIVEN undefined THEN does not throw", () => {
		class TestClass {
			@Assert.IsUndefined
			public testAttribute = undefined;
		}

		expect(() => new TestClass()).not.toThrow();
	});

	test("GIVEN null THEN throws", () => {
		class TestClass {
			@Assert.IsUndefined
			public testAttribute = null;
		}

		expect(() => new TestClass()).toThrow(
			new ExpectedValidationError(
				"s.literal(V)",
				"Expected values to be equals",
				null,
				undefined
			)
		);
	});
});
