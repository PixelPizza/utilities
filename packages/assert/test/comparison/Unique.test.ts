import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Unique tests", () => {
	test("GIVEN array with unique values THEN does not throw", () => {
		class Test {
			@Assert.Unique
			public test: string[] = ["test", "test2"];
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN array with duplicate values THEN throws", () => {
		class Test {
			@Assert.Unique
			public test: string[] = ["test", "test"];
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.array(T).unique",
				"Array values are not unique",
				["test", "test"],
				"Expected all values to be unique"
			)
		);
	});
});
