import { Assert } from "../../../src/index";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("Ip tests", () => {
	test.each([
		"0.0.0.0",
		"192.168.0.0",
		"178.4.234.3",
		"::1",
		"2001:0db8:85a3:0000:0000:8a2e:0370:7334",
		"2001:db8:85a3:0:0:8a2e:370:7334",
		"2001:db8:85a3::8a2e:370:7334"
	])("GIVEN ip %s THEN does not throw", (value) => {
		class Test {
			@Assert.Ip
			public ip: string = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid ip with assertion disabled THEN does not throw", () => {
		class Test {
			@Assert.Ip({ assertionEnabled: false })
			public ip: string = "0.0.0";
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each([
		"0.0.0",
		"2001:0db8:85a3:0000:0000:8a2e:0370",
		"2001:db8:85a3:0:0:8a2e:370"
	])("GIVEN ip %s THEN throws", (value) => {
		class Test {
			@Assert.Ip
			public ip: string = value;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.ip",
				"Invalid IP address",
				value,
				"expected to be IP address"
			)
		);
	});

	test.each(["0.0.0.0", "192.168.0.0", "178.4.234.3"])(
		"GIVEN ipv4 %s THEN does not throw",
		(value) => {
			class Test {
				@Assert.Ip(4)
				public ip: string = value;
			}

			expect(() => new Test()).not.toThrow();
		}
	);

	test.each(["0.0.0", "2001:0db8:85a3:0000:0000:8a2e:0370", "256.0.0.0"])(
		"GIVEN ipv4 %s THEN throws",
		(value) => {
			class Test {
				@Assert.Ip(4)
				public ip: string = value;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.ipv4",
					"Invalid IPv4 address",
					value,
					"expected to be IPv4 address"
				)
			);
		}
	);

	test.each([
		"::1",
		"2001:0db8:85a3:0000:0000:8a2e:0370:7334",
		"2001:db8:85a3:0:0:8a2e:370:7334",
		"2001:db8:85a3::8a2e:370:7334"
	])("GIVEN ipv6 %s THEN does not throw", (value) => {
		class Test {
			@Assert.Ip(6)
			public ip: string = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each([
		"2001:0db8:85a3:0000:0000:8a2e:0370",
		"2001:db8:85a3:0:0:8a2e:370"
	])("GIVEN ipv6 %s THEN throws", (value) => {
		class Test {
			@Assert.Ip(6)
			public ip: string = value;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.string.ipv6",
				"Invalid IPv6 address",
				value,
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
