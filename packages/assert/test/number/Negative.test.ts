import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Negative tests", () => {
	test("GIVEN negative number THEN does not throw", () => {
		class Test {
			@Assert.Negative
			public number = -1;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN positive number THEN throws", () => {
		class Test {
			@Assert.Negative
			public number = 1;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.lessThan",
				"Invalid number value",
				1,
				"expected < 0"
			)
		);
	});

	test("GIVEN zero THEN throws", () => {
		class Test {
			@Assert.Negative
			public number = 0;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.lessThan",
				"Invalid number value",
				0,
				"expected < 0"
			)
		);
	});
});
