import { Assert } from "../../src";
import {
	ExpectedConstraintError,
	MultiplePossibilitiesConstraintError,
	ValidationError
} from "@sapphire/shapeshift";

describe("Url tests", () => {
	test("GIVEN a valid url without options THEN does not throw", () => {
		class Test {
			@Assert.Url
			public url = "https://www.google.com";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN an invalid url without options THEN throws", () => {
		class Test {
			@Assert.Url
			public url = "google";
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.url",
				"Invalid URL",
				"google",
				"expected to match a URL"
			)
		);
	});

	test("GIVEN a valid url with allowed domains THEN does not throw", () => {
		class Test {
			@Assert.Url({ allowedDomains: ["google.com"] })
			public url = "https://google.com";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN an invalid url with allowed domains THEN throws", () => {
		class Test {
			@Assert.Url({ allowedDomains: ["google.com"] })
			public url = "https://www.google.com";
		}

		expect(() => new Test()).toThrow(
			new MultiplePossibilitiesConstraintError(
				"s.string.url",
				"Invalid URL domain",
				"https://www.google.com",
				["google.com"]
			)
		);
	});

	test("GIVEN a valid url with allowed protocols THEN does not throw", () => {
		class Test {
			@Assert.Url({ allowedProtocols: ["https:"] })
			public url = "https://www.google.com";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN an invalid url with allowed protocols THEN throws", () => {
		class Test {
			@Assert.Url({ allowedProtocols: ["https:"] })
			public url = "http://www.google.com";
		}

		expect(() => new Test()).toThrow(
			new MultiplePossibilitiesConstraintError(
				"s.string.url",
				"Invalid URL protocol",
				"http://www.google.com",
				["https:"]
			)
		);
	});

	test("GIVEN a number THEN throws", () => {
		class Test {
			@Assert.Url
			public url = 123;
		}

		expect(() => new Test()).toThrow(
			new ValidationError("s.string", "Expected a string primitive", 123)
		);
	});
});
