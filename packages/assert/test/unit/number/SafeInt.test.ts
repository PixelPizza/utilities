import { Assert } from "../../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("SafeInt tests", () => {
	describe("Property decorator", () => {
		test.each([
			Number.MIN_SAFE_INTEGER,
			Number.MIN_SAFE_INTEGER + 423432,
			0,
			Number.MAX_SAFE_INTEGER - 423432,
			Number.MAX_SAFE_INTEGER
		])("GIVEN %i THEN does not throw", (value) => {
			class Test {
				@Assert.SafeInt
				public number = value;
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN non-safe integer with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.SafeInt({ assertionEnabled: false })
				public number = Number.MIN_SAFE_INTEGER - 1;
			}

			expect(() => new Test()).not.toThrow();
		});

		test.each([
			Number.MIN_SAFE_INTEGER - 423432,
			Number.MIN_SAFE_INTEGER - 1,
			Number.MAX_SAFE_INTEGER + 1,
			Number.MAX_SAFE_INTEGER + 423432
		])("GIVEN %i THEN throws", (value) => {
			class Test {
				@Assert.SafeInt
				public number = value;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.number.safeInt",
					"Given value is not a safe integer",
					value,
					"Number.isSafeInteger(expected) to be true"
				)
			);
		});
	});

	describe("Parameter decorator", () => {
		test.each([
			Number.MIN_SAFE_INTEGER,
			Number.MIN_SAFE_INTEGER + 423432,
			0,
			Number.MAX_SAFE_INTEGER - 423432,
			Number.MAX_SAFE_INTEGER
		])("GIVEN %i THEN does not throw", (value) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.SafeInt number: number) {
					return number;
				}
			}

			expect(() => new Test().testFunc(value)).not.toThrow();
		});

		test("GIVEN non-safe integer with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(
					@Assert.SafeInt({ assertionEnabled: false }) number: number
				) {
					return number;
				}
			}

			expect(() =>
				new Test().testFunc(Number.MIN_SAFE_INTEGER - 1)
			).not.toThrow();
		});

		test.each([
			Number.MIN_SAFE_INTEGER - 423432,
			Number.MIN_SAFE_INTEGER - 1,
			Number.MAX_SAFE_INTEGER + 1,
			Number.MAX_SAFE_INTEGER + 423432
		])("GIVEN %i THEN throws", (value) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.SafeInt number: number) {
					return number;
				}
			}

			expect(() => new Test().testFunc(value)).toThrow(
				new ExpectedConstraintError(
					"s.number.safeInt",
					"Given value is not a safe integer",
					value,
					"Number.isSafeInteger(expected) to be true"
				)
			);
		});
	});
});
