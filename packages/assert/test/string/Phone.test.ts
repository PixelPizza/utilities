import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Phone tests", () => {
	test("GIVEN valid phone THEN does not throw", () => {
		class Test {
			@Assert.Phone
			public phone = "1234567890";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid phone THEN throws", () => {
		class Test {
			@Assert.Phone
			public phone = "123456789";
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.phone",
				"Invalid phone number",
				"123456789",
				"expected to be a phone number"
			)
		);
	});
});
