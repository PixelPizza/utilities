import Assert from "../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("String decorator tests", () => {
	test("valid use of string decorators", () => {
		class Test {
			@Assert.Date
			public dateString?: string;

			@Assert.Email
			@Assert.Length(30)
			@Assert.Regex(/^.+@.+\.com$/)
			public emailString?: string;

			@Assert.Ip
			public ipString?: string;

			@Assert.Phone
			public phoneString?: string;

			@Assert.Url
			public urlString?: string;

			@Assert.Uuid
			public uuidString?: string;

			@Assert.ValidateParameters
			public setDateString(@Assert.Date dateString: string) {
				this.dateString = dateString;
				return this;
			}

			@Assert.ValidateParameters
			public setEmailString(
				@Assert.Email
				@Assert.Length(30)
				@Assert.Regex(/^.+@.+\.com$/)
				emailString: string
			) {
				this.emailString = emailString;
				return this;
			}

			@Assert.ValidateParameters
			public setIpString(@Assert.Ip ipString: string) {
				this.ipString = ipString;
				return this;
			}

			@Assert.ValidateParameters
			public setPhoneString(@Assert.Phone phoneString: string) {
				this.phoneString = phoneString;
				return this;
			}

			@Assert.ValidateParameters
			public setUrlString(@Assert.Url urlString: string) {
				this.urlString = urlString;
				return this;
			}

			@Assert.ValidateParameters
			public setUuidString(@Assert.Uuid uuidString: string) {
				this.uuidString = uuidString;
				return this;
			}
		}

		expect(() =>
			new Test()
				.setDateString("2020-01-01T00:00:00.000Z")
				.setEmailString("email@example.com")
				.setIpString("0.0.0.0")
				.setPhoneString("+31643434343")
				.setUrlString("https://example.com")
				.setUuidString("ae1a26c4-c813-459d-9095-4ddf908ab514")
		).not.toThrow();
	});

	test("invalid use of string property decorators", () => {
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

	test("valid use of string parameter decorators", () => {
		class Test {
			@Assert.Date
			public dateString: unknown;

			@Assert.Email
			@Assert.Length(30)
			@Assert.Regex(/^.+@.+\.com$/)
			public emailString: unknown;

			@Assert.Ip
			public ipString: unknown;

			@Assert.Phone
			public phoneString: unknown;

			@Assert.Url
			public urlString: unknown;

			@Assert.Uuid
			public uuidString: unknown;

			@Assert.ValidateParameters
			public setDateString(@Assert.Date dateString: unknown) {
				this.dateString = dateString;
				return this;
			}

			@Assert.ValidateParameters
			public setEmailString(
				@Assert.Email
				@Assert.Length(30)
				@Assert.Regex(/^.+@.+\.com$/)
				emailString: unknown
			) {
				this.emailString = emailString;
				return this;
			}

			@Assert.ValidateParameters
			public setIpString(@Assert.Ip ipString: unknown) {
				this.ipString = ipString;
				return this;
			}

			@Assert.ValidateParameters
			public setPhoneString(@Assert.Phone phoneString: unknown) {
				this.phoneString = phoneString;
				return this;
			}

			@Assert.ValidateParameters
			public setUrlString(@Assert.Url urlString: unknown) {
				this.urlString = urlString;
				return this;
			}

			@Assert.ValidateParameters
			public setUuidString(@Assert.Uuid uuidString: unknown) {
				this.uuidString = uuidString;
				return this;
			}
		}

		expect(() => new Test().setDateString("notadate")).toThrow(
			new ExpectedConstraintError(
				"s.string.date",
				"Invalid date string",
				"notadate",
				"expected to be a valid date string (in the ISO 8601 or ECMA-262 format)"
			)
		);
		expect(() =>
			new Test().setEmailString("thisisaverylongnotemail")
		).toThrow(
			new ExpectedConstraintError(
				"s.string.regex",
				"Invalid string format",
				"thisisaverylongnotemail",
				"expected /^.+@.+\\.com$/.test(expected) to be true"
			)
		);
		expect(() => new Test().setIpString("0.0.0")).toThrow(
			new ExpectedConstraintError(
				"s.string.ip",
				"Invalid IP address",
				"0.0.0",
				"expected to be an IP address"
			)
		);
		expect(() => new Test().setPhoneString("+3164343434")).toThrow(
			new ExpectedConstraintError(
				"s.string.phone",
				"Invalid phone number",
				"+3164343434",
				"expected to be a phone number"
			)
		);
		expect(() => new Test().setUrlString("example")).toThrow(
			new ExpectedConstraintError(
				"s.string.url",
				"Invalid URL",
				"example",
				"expected to match a URL"
			)
		);
		expect(() =>
			new Test().setUuidString("ae1a26c4-c813-459d-9095-4ddf908ab51")
		).toThrow(
			new ExpectedConstraintError(
				"s.string.uuid",
				"Invalid string format",
				"ae1a26c4-c813-459d-9095-4ddf908ab51",
				"expected to match UUIDv4"
			)
		);
	});
});
