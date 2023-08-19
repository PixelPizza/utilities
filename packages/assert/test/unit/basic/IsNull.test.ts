import Assert from "../../../src/index";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("IsNull tests", () => {
	describe("Property decorator", () => {
		test("GIVEN null THEN does not throw", () => {
			class TestClass {
				@Assert.IsNull
				public testAttribute = null;
			}

			expect(() => new TestClass()).not.toThrow();
		});

		test("GIVEN undefined with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.IsNull({ assertionEnabled: false })
				public value = undefined;
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN undefined THEN throws", () => {
			class TestClass {
				@Assert.IsNull
				public testAttribute = undefined;
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

	describe("Parameter decorator", () => {
		test("GIVEN null THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.IsNull value: null) {
					return value;
				}
			}

			expect(() => new Test().testFunc(null)).not.toThrow();
		});

		test("GIVEN undefined with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(
					@Assert.IsNull({ assertionEnabled: false }) value: unknown
				) {
					return value;
				}
			}

			expect(() => new Test().testFunc(undefined)).not.toThrow();
		});

		test("GIVEN undefined THEN throws", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.IsNull value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(undefined)).toThrow(
				new ExpectedValidationError(
					"s.literal(V)",
					"Expected values to be equals",
					undefined,
					null
				)
			);
		});
	});
});
