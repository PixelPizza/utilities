import Assert from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("InvalidDate tests", () => {
	test("GIVEN invalid date THEN does not throw", () => {
		class Test {
			@Assert.InvalidDate
			public date: Date = new Date("invalid");
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN valid date THEN throws", () => {
		class Test {
			@Assert.InvalidDate
			public date: Date = new Date();
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.date.invalid",
				"Invalid Date value",
				"2023-08-07T19:08:32.034Z",
				"expected === NaN"
			)
		);
	});
});
