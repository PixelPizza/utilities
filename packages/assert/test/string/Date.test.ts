import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Date tests", () => {
	test("GIVEN valid date string THEN does not throw", () => {
		class Test {
			@Assert.Date
			public date = "2020-01-01T00:00:00.000Z";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid date string THEN throws", () => {
		class Test {
			@Assert.Date
			public date = "invalid";
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.date",
				"Invalid date string",
				"invalid",
				"expected to be a valid date string (in the ISO 8601 or ECMA-262 format)"
			)
		);
	});
});
