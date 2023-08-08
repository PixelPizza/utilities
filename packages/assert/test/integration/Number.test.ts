import Assert from "../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Number decorator tests", () => {
	test("valid use of number decorators", () => {
		class Test {
			@Assert.Finite
			@Assert.Int
			@Assert.SafeInt
			public number = 3;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("invalid use of number decorators", () => {
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
});
