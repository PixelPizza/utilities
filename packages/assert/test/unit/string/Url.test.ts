import { Assert } from "../../../src/index";
import {
	ExpectedConstraintError,
	MultiplePossibilitiesConstraintError,
	ValidationError
} from "@sapphire/shapeshift";

describe("Url tests", () => {
	test.each<string>([
		"https://www.google.com",
		"https://www.google.com/",
		"https://www.google.com/search?q=hello+world",
		"https://www.google.com/search?q=hello+world#test",
		"http://www.google.com",
		"https://google.com"
	])("GIVEN %s without options THEN does not throw", (value) => {
		class Test {
			@Assert.Url
			public url = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each<string>(["google", "google.com", "https://"])(
		"GIVEN %s without options THEN throws",
		(value) => {
			class Test {
				@Assert.Url
				public url = value;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.url",
					"Invalid URL",
					value,
					"expected to match a URL"
				)
			);
		}
	);

	test.each<[string, `${string}.${string}`[]]>([
		["https://google.com", ["google.com"]],
		["https://pixelpizza.eu", ["google.com", "pixelpizza.eu"]],
		["https://pixelpizza.eu", ["pixelpizza.eu"]]
	])(
		"GIVEN %s with allowed domains %s THEN does not throw",
		(url, allowedDomains) => {
			class Test {
				@Assert.Url({ allowedDomains })
				public url = url;
			}

			expect(() => new Test()).not.toThrow();
		}
	);

	test.each<[string, `${string}.${string}`[]]>([
		["https://google.com", ["pixelpizza.eu"]],
		["https://pixelpizza.eu", ["google.com"]],
		["https://pixelpizza.eu", ["google.com", "discord.com"]],
		["https://www.google.com", ["google.com"]]
	])(
		"GIVEN %s with allowed domains %s THEN throws",
		(url, allowedDomains) => {
			class Test {
				@Assert.Url({ allowedDomains })
				public url = url;
			}

			expect(() => new Test()).toThrow(
				new MultiplePossibilitiesConstraintError(
					"s.string.url",
					"Invalid URL domain",
					url,
					allowedDomains
				)
			);
		}
	);

	test.each<[string, `${string}:`[]]>([
		["https://www.google.com", ["https:"]],
		["http://example.com", ["http:"]],
		["https://www.google.com", ["https:", "http:"]],
		["https://www.google.com", ["https:", "http:", "ftp:"]],
		["smtp://example.com", ["smtp:"]],
		["mysql://user:password@localhost/database?version=8", ["mysql:"]]
	])(
		"GIVEN %s with allowed protocols %s THEN does not throw",
		(url, allowedProtocols) => {
			class Test {
				@Assert.Url({ allowedProtocols })
				public url = url;
			}

			expect(() => new Test()).not.toThrow();
		}
	);

	test.each<[string, `${string}:`[]]>([
		["https://www.google.com", ["http:"]],
		["http://example.com", ["https:"]],
		["https://www.google.com", ["ftp:"]],
		["http://www.google.com", ["https:", "ftp:"]],
		["mysql://user:password@localhost/database?version=8", ["mysqlx:"]]
	])(
		"GIVEN %s with allowed protocols %s THEN throws",
		(url, allowedProtocols) => {
			class Test {
				@Assert.Url({ allowedProtocols })
				public url = url;
			}

			expect(() => new Test()).toThrow(
				new MultiplePossibilitiesConstraintError(
					"s.string.url",
					"Invalid URL protocol",
					url,
					allowedProtocols
				)
			);
		}
	);

	test("GIVEN invalid url with assertion disabled THEN does not throw", () => {
		class Test {
			@Assert.Url({ assertionEnabled: false })
			public url = "google";
		}

		expect(() => new Test()).not.toThrow();
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
