import { Assert } from "../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("Regex tests", () => {
	test("GIVEN valid regex THEN does not throw", () => {
		class Test {
			@Assert.Regex(/test/)
			public prop = "test";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid regex THEN throws", () => {
		class Test {
			@Assert.Regex(/test/)
			public prop = "invalid";
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.regex",
				"Invalid string format",
				"invalid",
				"expected /test/.test(expected) to be true"
			)
		);
	});

	test("GIVEN number THEN throws", () => {
		class Test {
			@Assert.Regex(/test/)
			public prop = 1;
		}

		expect(() => new Test()).toThrow(
			new ValidationError("s.string", "Expected a string primitive", 1)
		);
	});
});
