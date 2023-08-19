import { Assert } from "../../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Phone tests", () => {
	describe("Property decorator", () => {
		test.each<string>([
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

		test("GIVEN invalid phone with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.Phone({ assertionEnabled: false })
				public phone = "123456789";
			}

			expect(() => new Test()).not.toThrow();
		});

		test.each<string>([
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

	describe("Parameter decorator", () => {
		test.each<string>([
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
				@Assert.ValidateParameters
				public testFunc(@Assert.Phone phone: string) {
					return phone;
				}
			}

			expect(() => new Test().testFunc(value)).not.toThrow();
		});

		test("GIVEN invalid phone with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(
					@Assert.Phone({ assertionEnabled: false }) phone: string
				) {
					return phone;
				}
			}

			expect(() => new Test().testFunc("123456789")).not.toThrow();
		});

		test.each<string>([
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
				@Assert.ValidateParameters
				public testFunc(@Assert.Phone phone: string) {
					return phone;
				}
			}

			expect(() => new Test().testFunc(value)).toThrow(
				new ExpectedConstraintError(
					"s.string.phone",
					"Invalid phone number",
					value,
					"expected to be a phone number"
				)
			);
		});
	});
});
