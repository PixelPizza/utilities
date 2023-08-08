import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Phone tests", () => {
	test.each([
		"1234567890",
		"123-456-7890",
		"123.456.7890",
		"123 456 7890",
		"(123) 456 7890",
		"(123) 456-7890",
		"(123)456-7890",
		"+31636363634",
		"+1 234 567 8901",
		"1 (234) 567-8901"
	])("GIVEN %s THEN does not throw", (value) => {
		class Test {
			@Assert.Phone
			public phone: string = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each([
		"123456789",
		"123-456-789",
		"123.456.789",
		"123 456 789",
		"(123) 456 789",
		"(123) 456-789",
		"(123)456-789",
		"+3163636363",
		"+1 234 567 890",
		"1 (234) 567-890"
	])("GIVEN %s THEN throws", (value) => {
		class Test {
			@Assert.Phone
			public phone = value;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.phone",
				"Invalid phone number",
				value,
				"expected to be a phone number"
			)
		);
	});
});
