import Assert from "../../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("ValidDate tests", () => {
	test.each<ConstructorParameters<typeof Date>[0]>([
		new Date(),
		Date.now(),
		"2020-01-01T00:00:00.000Z",
		"2020-01-01T00:00:00.000+00:00"
	])("GIVEN %s THEN does not throw", (date) => {
		class Test {
			@Assert.ValidDate
			public date: Date = new Date(date);
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN invalid date with assertion disabled THEN does not throw", () => {
		class Test {
			@Assert.ValidDate({ assertionEnabled: false })
			public date: Date = new Date("invalid");
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each<ConstructorParameters<typeof Date>[0]>([
		new Date("invalid"),
		"invalid",
		Infinity,
		NaN
	])("GIVEN %s THEN throws", (date) => {
		class Test {
			@Assert.ValidDate
			public date: Date = new Date(date);
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.date.valid",
				"Invalid Date value",
				"Invalid Date",
				"expected !== NaN"
			)
		);
	});
});
