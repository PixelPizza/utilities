import Assert from "../../src/index";
import {
	CombinedError,
	ExpectedConstraintError,
	ValidationError
} from "@sapphire/shapeshift";

describe("Sign decorator tests", () => {
	test("valid use of sign decorators", () => {
		class Test {
			@Assert.Positive
			public positiveValue?: number;

			@Assert.Negative
			public negativeValue?: number;

			@Assert.ValidateParameters
			public setPositiveValue(@Assert.Positive value: number) {
				this.positiveValue = value;
				return this;
			}

			@Assert.ValidateParameters
			public setNegativeValue(@Assert.Negative value: number) {
				this.negativeValue = value;
				return this;
			}
		}

		expect(() =>
			new Test().setPositiveValue(3).setNegativeValue(-1)
		).not.toThrow();
	});

	test("invalid use of sign property decorators", () => {
		class Test {
			@Assert.Positive
			public positiveValue = -1;

			@Assert.Negative
			public negativeValue = 3;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.greaterThanOrEqual",
					"Invalid number value",
					-1,
					"expected >= 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					-1
				)
			])
		);
	});

	test("invalid use of sign parameter decorators", () => {
		class Test {
			@Assert.Positive
			public positiveValue: unknown;

			@Assert.Negative
			public negativeValue: unknown;

			@Assert.ValidateParameters
			public setPositiveValue(@Assert.Positive value: unknown) {
				this.positiveValue = value;
				return this;
			}

			@Assert.ValidateParameters
			public setNegativeValue(@Assert.Negative value: unknown) {
				this.negativeValue = value;
				return this;
			}
		}

		expect(() => new Test().setPositiveValue(-1)).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.greaterThanOrEqual",
					"Invalid number value",
					-1,
					"expected >= 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					-1
				)
			])
		);
		expect(() => new Test().setNegativeValue(3)).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.lessThan",
					"Invalid number value",
					3,
					"expected < 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					3
				)
			])
		);
	});
});
