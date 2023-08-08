import Assert from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Date decorator tests", () => {
	test("valid use of date decorators", () => {
		class Test {
			@Assert.ValidDate
			public validDate = new Date();

			@Assert.InvalidDate
			public invalidDate = new Date("invalid");
		}

		expect(() => new Test()).not.toThrow();
	});

	test("invalid use of date decorators", () => {
		class Test {
			@Assert.ValidDate
			public validDate = new Date("invalid");

			@Assert.InvalidDate
			public invalidDate = new Date();
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.date.valid",
				"Invalid Date value",
				new Date("invalid"),
				"expected !== NaN"
			)
		);
	});
});
