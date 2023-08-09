import { Assert } from "../../src";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("EqualTo tests", () => {
	test("GIVEN 1, 1 THEN does not throw", () => {
		class Test {
			@Assert.EqualTo(1)
			public value = 1;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN 1, 2 THEN throws", () => {
		class Test {
			@Assert.EqualTo(2)
			public value = 1;
		}

		expect(() => new Test()).toThrow(
			new ExpectedValidationError(
				"s.literal(V)",
				"Expected values to be equals",
				1,
				2
			)
		);
	});

	test("GIVEN '1', 1 THEN throws", () => {
		class Test {
			@Assert.EqualTo(1)
			public value = "1";
		}

		expect(() => new Test()).toThrow(
			new ExpectedValidationError(
				"s.literal(V)",
				"Expected values to be equals",
				"1",
				1
			)
		);
	});
});
