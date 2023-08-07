import Assert from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("ValidDate tests", () => {
	test("GIVEN valid date THEN does not throw", () => {
		class Test {
			@Assert.ValidDate
			public date: Date = new Date();
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid date THEN throws", () => {
		class Test {
			@Assert.ValidDate
			public date: Date = new Date("invalid");
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.date.valid",
				"Invalid Date value",
				"Invalid Date",
				"expected !== NaN"
			)
		);
	});
});
