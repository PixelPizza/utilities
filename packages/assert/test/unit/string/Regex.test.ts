import { Assert } from "../../../src/index";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("Regex tests", () => {
	test.each([
		["test", /test/],
		["test", /test/i],
		["12345", /\d+/]
	])("GIVEN %s with regex %s THEN does not throw", (value, regex) => {
		class Test {
			@Assert.Regex(regex)
			public prop = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid value with assertion disabled THEN does not throw", () => {
		class Test {
			@Assert.Regex({ regex: /test/, assertionEnabled: false })
			public prop = 1;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each([
		["invalid", /test/],
		["invalid", /test/i],
		["invalid", /\d+/],
		["12345", /[^0-9]+/]
	])("GIVEN %s with regex %s THEN throws", (value, regex) => {
		class Test {
			@Assert.Regex(regex)
			public prop = value;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.regex",
				"Invalid string format",
				value,
				`expected ${regex}.test(expected) to be true`
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
