import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Positive tests", () => {
	test("GIVEN positive number THEN does not throw", () => {
		class Test {
			@Assert.Positive
			public number = 1;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN negative number THEN throws", () => {
		class Test {
			@Assert.Positive
			public number = -1;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.greaterThanOrEqual",
				"Invalid number value",
				-1,
				"expected >= 0"
			)
		);
	});

	test("GIVEN zero THEN does not throw", () => {
		class Test {
			@Assert.Positive
			public number = 0;
		}

		expect(() => new Test()).not.toThrow();
	});
});
