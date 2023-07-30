import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("SafeInt tests", () => {
	test("GIVEN safe int THEN does not throw", () => {
		class Test {
			@Assert.SafeInt
			public number = Math.pow(2, 53) - 1;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN unsafe int THEN throws", () => {
		class Test {
			@Assert.SafeInt
			public number = Math.pow(2, 53);
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.safeInt",
				"Given value is not a safe integer",
				Math.pow(2, 53),
				"Number.isSafeInteger(expected) to be true"
			)
		);
	});
});
