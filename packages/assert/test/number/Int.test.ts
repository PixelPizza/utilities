import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Int tests", () => {
	test("GIVEN int THEN does not throw", () => {
		class Test {
			@Assert.Int
			public number = 10;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN float THEN throws", () => {
		class Test {
			@Assert.Int
			public number = 10.3;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.int",
				"Given value is not an integer",
				10.3,
				"Number.isInteger(expected) to be true"
			)
		);
	});
});
