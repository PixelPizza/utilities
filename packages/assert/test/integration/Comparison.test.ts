import Assert from "../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Comparison decorators tests", () => {
	test("valid use of comparison decorators", () => {
		class Test {
			@Assert.Range(1, 4)
			@Assert.EqualTo(4)
			@Assert.DivisibleBy(2)
			public number = 4;

			@Assert.DateRange(new Date(2020, 1, 1))
			public date = new Date(2020, 1, 1);

			@Assert.Unique
			public array = ["test", "test1"];
		}

		expect(() => new Test()).not.toThrow();
	});

	test("invalid use of comparison decorators", () => {
		class Test {
			@Assert.Range(1, 3)
			@Assert.EqualTo(2)
			@Assert.DivisibleBy(2)
			public number = 4;

			@Assert.DateRange(new Date(2020, 0, 1))
			public date = new Date(2020, 1, 1);

			@Assert.Unique
			public array = ["test", "test"];
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.lessThanOrEqual",
				"Invalid number value",
				4,
				"expected <= 3"
			)
		);
	});
});
