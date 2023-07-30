import { Assert } from "../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("Email tests", () => {
	test("GIVEN valid email THEN does not throw", () => {
		class Test {
			@Assert.Email
			public email = "email@example.com";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid email THEN throws", () => {
		class Test {
			@Assert.Email
			public email = "invalid";
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.email",
				"Invalid email address",
				"invalid",
				"expected to be an email address"
			)
		);
	});

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
