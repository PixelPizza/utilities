import { Assert } from "../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("Email tests", () => {
	test.each([
		"email@example.com",
		"john.hanks@example.com",
		"jon_hank@example.com",
		"info@pixelpizza.eu"
	])("GIVEN %s THEN does not throw", (value) => {
		class Test {
			@Assert.Email
			public email: string = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each(["invalid", "invalid@", "invalid@invalid", "invalid.com"])(
		"GIVEN %s THEN throws",
		(value) => {
			class Test {
				@Assert.Email
				public email = value;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.email",
					"Invalid email address",
					value,
					"expected to be an email address"
				)
			);
		}
	);

	test("GIVEN number THEN throws", () => {
		class Test {
			@Assert.Email
			public email = 1;
		}

		expect(() => new Test()).toThrow(
			new ValidationError("s.string", "Expected a string primitive", 1)
		);
	});
});
