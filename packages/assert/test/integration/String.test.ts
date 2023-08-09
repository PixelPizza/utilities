import Assert from "../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("String decorator tests", () => {
	test("valid use of string decorators", () => {
		class Test {
			@Assert.Date
			public dateString = "2020-01-01T00:00:00.000Z";

			@Assert.Email
			@Assert.Length(30)
			@Assert.Regex(/^.+@.+\.com$/)
			public emailString = "email@example.com";

			@Assert.Ip
			public ipString = "0.0.0.0";

			@Assert.Phone
			public phoneString = "+31643434343";

			@Assert.Url
			public urlString = "https://example.com";

			@Assert.Uuid
			public uuidString = "ae1a26c4-c813-459d-9095-4ddf908ab514";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("invalid use of string decorators", () => {
		class Test {
			@Assert.Date
			public dateString = "notadate";

			@Assert.Email
			@Assert.Length(30)
			@Assert.Regex(/^.+@.+\.com$/)
			public emailString = "thisisaverylongnotemail";

			@Assert.Ip
			public ipString = "0.0.0";

			@Assert.Phone
			public phoneString = "+3164343434";

			@Assert.Url
			public urlString = "example";

			@Assert.Uuid
			public uuidString = "ae1a26c4-c813-459d-9095-4ddf908ab51";
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.date",
				"Invalid date string",
				"notadate",
				"expected to be a valid date string (in the ISO 8601 or ECMA-262 format)"
			)
		);
	});
});
