import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("DivisibleBy tests", () => {
	test("GIVEN value is divisible by number divisor THEN does not throw", () => {
		class Test {
			@Assert.DivisibleBy(2)
			public value = 10;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN value is divisible by bigint divisor THEN does not throw", () => {
		class Test {
			@Assert.DivisibleBy(2n)
			public value = 10n;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN value is not divisible by number divisor THEN throws", () => {
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

	test("GIVEN value is not divisible by bigint divisor THEN throws", () => {
		class Test {
			@Assert.DivisibleBy(2n)
			public value = 11n;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.divisibleBy",
				"BigInt is not divisible",
				11n,
				"expected % 2n === 0n"
			)
		);
	});
});
