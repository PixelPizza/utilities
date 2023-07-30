import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("DivisibleBy tests", () => {
	test("GIVEN value is divisible by divisor THEN does not throw", () => {
		class Test {
			@Assert.DivisibleBy(2)
			public value = 10;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN value is not divisible by divisor THEN throws", () => {
		class Test {
			@Assert.DivisibleBy(2)
			public value = 11;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.divisibleBy",
				"Number is not divisible",
				11,
				"expected % 2 === 0"
			)
		);
	});
});
