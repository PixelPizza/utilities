import { Assert } from "../../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Unique tests", () => {
	test.each<[...args: unknown[]]>([
		["test", "test2"],
		[1, 2],
		[true, false],
		[1, 2, 3],
		["test", "test2", "test3"],
		[1, "test", true],
		[Symbol("1"), Symbol("2")],
		[Symbol("1"), Symbol("2"), Symbol("3")],
		[Symbol("1"), "test", true]
	])("GIVEN array %# with unique values THEN does not throw", (...values) => {
		class Test {
			@Assert.Unique
			public test = values;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN array with duplicate values and assertion disabled THEN does not throw", () => {
		class Test {
			@Assert.Unique({ assertionEnabled: false })
			public test = [1, 2, 1];
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each<[...args: unknown[]]>([
		["test", "test"],
		[1, 1],
		[true, true],
		[1, 2, 1],
		["test", "test2", "test"],
		[1, "test", true, 1]
	])("GIVEN array %# with duplicate values THEN throws", (...values) => {
		class Test {
			@Assert.Unique
			public test = values;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.array(T).unique",
				"Array values are not unique",
				values,
				"Expected all values to be unique"
			)
		);
	});
});
