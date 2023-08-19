import Assert from "../../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("IsFalse tests", () => {
	describe("Property decorator", () => {
		test("GIVEN false THEN does not throw", () => {
			class TestClass {
				@Assert.IsFalse
				public testAttribute = false;
			}

			expect(() => new TestClass()).not.toThrow();
		});

		test("GIVEN true with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.IsFalse({ assertionEnabled: false })
				public value = true;
			}

			expect(() => new Test()).not.toThrow();
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

	describe("Parameter decorator", () => {
		test("GIVEN false THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.IsFalse value: boolean) {
					return value;
				}
			}

			expect(() => new Test().testFunc(false)).not.toThrow();
		});

		test("GIVEN true with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(
					@Assert.IsFalse({ assertionEnabled: false }) value: boolean
				) {
					return value;
				}
			}

			expect(() => new Test().testFunc(true)).not.toThrow();
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
				@Assert.ValidateParameters
				public testFunc(@Assert.IsFalse value: unknown) {
					return value;
				}
			}

			expect(() => new TestClass().testFunc(value)).toThrow(error);
		});
	});
});
