import Assert from "../../src";
import {
	CombinedError,
	ExpectedConstraintError,
	ValidationError
} from "@sapphire/shapeshift";

describe("Sign decorator tests", () => {
	test("valid use of sign decorators", () => {
		class Test {
			@Assert.Positive
			public positiveValue = 3;

			@Assert.Negative
			public negativeValue = -1;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("invalid use of sign decorators", () => {
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
});
