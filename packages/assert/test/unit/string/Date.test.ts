import { Assert } from "../../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Date tests", () => {
	test.each([
		"2020-01-01T00:00:00.000Z",
		"2020-01-01T00:00:00.000+00:00",
		"2020-01-01T00:00:00.000+0000",
		"2020-01-01",
		"2020-01-01T00:00:00"
	])("GIVEN %s THEN does not throw", (value) => {
		class Test {
			@Assert.Date
			public date: string = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid date with assertion disabled THEN does not throw", () => {
		class Test {
			@Assert.Date({ assertionEnabled: false })
			public date: string = "invalid";
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each(["invalid", "notadate", "2022-13-01", "0-01-32", "00:00:00"])(
		"GIVEN %s THEN throws",
		(value) => {
			class Test {
				@Assert.Date
				public date: string = value;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.date",
					"Invalid date string",
					value,
					"expected to be a valid date string (in the ISO 8601 or ECMA-262 format)"
				)
			);
		}
	);
});
