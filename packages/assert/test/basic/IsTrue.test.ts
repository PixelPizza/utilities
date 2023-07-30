import Assert from "../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("IsTrue tests", () => {
	test("GIVEN true THEN does not throw", () => {
		class TestClass {
			@Assert.IsTrue
			public testAttribute: boolean;

			public constructor() {
				this.testAttribute = true;
			}
		}

		expect(() => new TestClass()).not.toThrow();
	});

	test("GIVEN false THEN throws", () => {
		class TestClass {
			@Assert.IsTrue
			public testAttribute: boolean;

			public constructor() {
				this.testAttribute = false;
			}
		}

		expect(() => new TestClass()).toThrow(
			new ExpectedConstraintError(
				"s.boolean.true",
				"Invalid boolean value",
				false,
				"true"
			)
		);
	});

	test("GIVEN null THEN throws", () => {
		class TestClass {
			@Assert.IsTrue
			public testAttribute: null;

			public constructor() {
				this.testAttribute = null;
			}
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
