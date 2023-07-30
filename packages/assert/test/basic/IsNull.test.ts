import Assert from "../../src";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("IsNull tests", () => {
	test("GIVEN null THEN does not throw", () => {
		class TestClass {
			@Assert.IsNull
			public testAttribute: null;

			public constructor() {
				this.testAttribute = null;
			}
		}

		expect(() => new TestClass()).not.toThrow();
	});

	test("GIVEN undefined THEN throws", () => {
		class TestClass {
			@Assert.IsNull
			public testAttribute: undefined;

			public constructor() {
				this.testAttribute = undefined;
			}
		}

		expect(() => new TestClass()).toThrow(
			new ExpectedValidationError(
				"s.literal(V)",
				"Expected values to be equals",
				undefined,
				null
			)
		);
	});
});
