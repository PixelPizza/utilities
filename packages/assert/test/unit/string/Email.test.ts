import { Assert } from "../../../src/index";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("Email tests", () => {
	describe("Property decorator", () => {
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

		test("GIVEN invalid email with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.Email({ assertionEnabled: false })
				public email = "invalid";
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
				new ValidationError(
					"s.string",
					"Expected a string primitive",
					1
				)
			);
		});
	});

	describe("Parameter decorator", () => {
		test.each([
			"email@example.com",
			"john.hanks@example.com",
			"jon_hank@example.com",
			"info@pixelpizza.eu"
		])("GIVEN %s THEN does not throw", (value) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.Email email: string) {
					return email;
				}
			}

			expect(() => new Test().testFunc(value)).not.toThrow();
		});

		test("GIVEN invalid email with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(
					@Assert.Email({ assertionEnabled: false }) email: string
				) {
					return email;
				}
			}

			expect(() => new Test().testFunc("invalid")).not.toThrow();
		});

		test.each(["invalid", "invalid@", "invalid@invalid", "invalid.com"])(
			"GIVEN %s THEN throws",
			(value) => {
				class Test {
					@Assert.ValidateParameters
					public testFunc(@Assert.Email email: string) {
						return email;
					}
				}

				expect(() => new Test().testFunc(value)).toThrow(
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
				@Assert.ValidateParameters
				public testFunc(@Assert.Email email: number) {
					return email;
				}
			}

			expect(() => new Test().testFunc(1)).toThrow(
				new ValidationError(
					"s.string",
					"Expected a string primitive",
					1
				)
			);
		});
	});
});
