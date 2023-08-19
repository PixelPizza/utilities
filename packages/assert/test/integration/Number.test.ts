import Assert from "../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Number decorator tests", () => {
	test("valid use of number decorators", () => {
		class Test {
			@Assert.Finite
			@Assert.Int
			@Assert.SafeInt
			public number?: number;

			@Assert.ValidateParameters
			public setNumber(
				@Assert.Finite
				@Assert.Int
				@Assert.SafeInt
				number: number
			) {
				this.number = number;
				return this;
			}
		}

		expect(() => new Test().setNumber(3)).not.toThrow();
	});

	test("invalid use of number property decorators", () => {
		class Test {
			@Assert.Finite
			@Assert.Int
			@Assert.SafeInt
			public number = NaN;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.finite",
				"Given value is not finite",
				NaN,
				"Number.isFinite(expected) to be true"
			)
		);
	});

	test("invalid use of number parameter decorators", () => {
		class Test {
			@Assert.Finite
			@Assert.Int
			@Assert.SafeInt
			public number: unknown;

			@Assert.ValidateParameters
			public setNumber(
				@Assert.Finite
				@Assert.Int
				@Assert.SafeInt
				number: unknown
			) {
				this.number = number;
				return this;
			}
		}

		expect(() => new Test().setNumber(NaN)).toThrow(
			new ExpectedConstraintError(
				"s.number.safeInt",
				"Given value is not a safe integer",
				NaN,
				"Number.isSafeInteger(expected) to be true"
			)
		);
	});
});
