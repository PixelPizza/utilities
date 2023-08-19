import Assert from "../../../src/index";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("IsTrue tests", () => {
	describe("Property decorator", () => {
		test("GIVEN true THEN does not throw", () => {
			class TestClass {
				@Assert.IsTrue
				public testAttribute = true;
			}

			expect(() => new TestClass()).not.toThrow();
		});

		test("GIVEN false with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.IsTrue({ assertionEnabled: false })
				public value = false;
			}

			expect(() => new Test()).not.toThrow();
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

	describe("Parameter decorator", () => {
		test("GIVEN true THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.IsTrue value: boolean) {
					return value;
				}
			}

			expect(() => new Test().testFunc(true)).not.toThrow();
		});

		test("GIVEN false with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(
					@Assert.IsTrue({ assertionEnabled: false }) value: boolean
				) {
					return value;
				}
			}

			expect(() => new Test().testFunc(false)).not.toThrow();
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
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.IsTrue value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(value)).toThrow(error);
		});
	});
});
