import { Assert } from "../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("Ip tests", () => {
	test("GIVEN valid ip THEN does not throw", () => {
		class Test {
			@Assert.Ip
			public ip = "0.0.0.0";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid ip THEN throws", () => {
		class Test {
			@Assert.Ip
			public ip = "0.0.0";
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.ip",
				"Invalid IP address",
				"0.0.0",
				"expected to be IP address"
			)
		);
	});

	test("GIVEN valid ipv4 THEN does not throw", () => {
		class Test {
			@Assert.Ip(4)
			public ip = "0.0.0.0";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid ipv4 THEN throws", () => {
		class Test {
			@Assert.Ip(4)
			public ip = "0.0.0";
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.ipv4",
				"Invalid IPv4 address",
				"0.0.0",
				"expected to be IPv4 address"
			)
		);
	});

	test("GIVEN valid ipv6 THEN does not throw", () => {
		class Test {
			@Assert.Ip(6)
			public ip = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid ipv6 THEN throws", () => {
		class Test {
			@Assert.Ip(6)
			public ip = "2001:0db8:85a3:0000:0000:8a2e:0370";
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.ipv6",
				"Invalid IPv6 address",
				"2001:0db8:85a3:0000:0000:8a2e:0370",
				"expected to be IPv6 address"
			)
		);
	});

	test("GIVEN number THEN throws", () => {
		class Test {
			@Assert.Ip
			public ip = 1;
		}

		expect(() => new Test()).toThrow(
			new ValidationError("s.string", "Expected a string primitive", 1)
		);
	});
});
