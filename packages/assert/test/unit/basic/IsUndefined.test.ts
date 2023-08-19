import Assert from "../../../src/index";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("IsUndefined tests", () => {
	describe("Property decorator", () => {
		test("GIVEN undefined THEN does not throw", () => {
			class TestClass {
				@Assert.IsUndefined
				public testAttribute = undefined;
			}

			expect(() => new TestClass()).not.toThrow();
		});

		test("GIVEN null with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.IsUndefined({ assertionEnabled: false })
				public value = null;
			}

			expect(() => new Test()).not.toThrow();
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

	describe("Parameter decorator", () => {
		test("GIVEN undefined THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.IsUndefined value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(undefined)).not.toThrow();
		});

		test("GIVEN null with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(
					@Assert.IsUndefined({ assertionEnabled: false })
					value: unknown
				) {
					return value;
				}
			}

			expect(() => new Test().testFunc(null)).not.toThrow();
		});

		test("GIVEN null THEN throws", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.IsUndefined value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(null)).toThrow(
				new ExpectedValidationError(
					"s.literal(V)",
					"Expected values to be equals",
					null,
					undefined
				)
			);
		});
	});
});
