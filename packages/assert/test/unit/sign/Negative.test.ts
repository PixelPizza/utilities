import { Assert } from "../../../src";
import {
	CombinedError,
	ExpectedConstraintError,
	ValidationError
} from "@sapphire/shapeshift";

describe("Negative tests", () => {
	describe("Property decorator", () => {
		test.each([-1, -32, -85, -1n, -32n, -85n])(
			"GIVEN %s THEN does not throw",
			(value) => {
				class Test {
					@Assert.Negative
					public number = value;
				}

				expect(() => new Test()).not.toThrow();
			}
		);

		test("GIVEN postive number with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.Negative({ assertionEnabled: false })
				public number = 1;
			}

			expect(() => new Test()).not.toThrow();
		});

		test.each([0, 1, 32, 85, 0n, 1n, 32n, 85n])(
			"GIVEN %s THEN throws",
			(value) => {
				class Test {
					@Assert.Negative
					public number = value;
				}

				expect(() => new Test()).toThrow(
					new CombinedError([
						new ExpectedConstraintError(
							`s.${typeof value as "number" | "bigint"}.lessThan`,
							`Invalid ${
								typeof value as "number" | "bigint"
							} value`,
							value,
							`expected < 0${
								typeof value === "bigint" ? "n" : ""
							}`
						),
						new ValidationError(
							`s.${
								typeof value === "number" ? "bigint" : "number"
							}`,
							`Expected a ${
								typeof value === "number" ? "bigint" : "number"
							} primitive`,
							value
						)
					])
				);
			}
		);
	});

	describe("Parameter decorator", () => {
		test.each([-1, -32, -85, -1n, -32n, -85n])(
			"GIVEN %s THEN does not throw",
			(value) => {
				class Test {
					@Assert.ValidateParameters
					public testFunc(@Assert.Negative number: number | bigint) {
						return number;
					}
				}

				expect(() => new Test().testFunc(value)).not.toThrow();
			}
		);

		test("GIVEN positive number with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(
					@Assert.Negative({ assertionEnabled: false })
					number: number | bigint
				) {
					return number;
				}
			}

			expect(() => new Test().testFunc(1)).not.toThrow();
		});

		test.each([0, 1, 32, 85, 0n, 1n, 32n, 85n])(
			"GIVEN %s THEN throws",
			(value) => {
				class Test {
					@Assert.ValidateParameters
					public testFunc(@Assert.Negative number: number | bigint) {
						return number;
					}
				}

				expect(() => new Test().testFunc(value)).toThrow(
					new CombinedError([
						new ExpectedConstraintError(
							`s.${typeof value as "number" | "bigint"}.lessThan`,
							`Invalid ${typeof value} value`,
							value,
							`expected < 0${
								typeof value === "bigint" ? "n" : ""
							}`
						),
						new ValidationError(
							`s.${
								typeof value === "number" ? "bigint" : "number"
							}`,
							`Expected a ${
								typeof value === "number" ? "bigint" : "number"
							} primitive`,
							value
						)
					])
				);
			}
		);
	});
});
