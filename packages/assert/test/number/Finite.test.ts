import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Finite tests", () => {
	test("GIVEN a finite number THEN does not throw", () => {
		class Test {
			@Assert.Finite
			public number = 4359853954853409;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN a non-finite number THEN throws", () => {
		class Test {
			@Assert.Finite
			public number = Infinity;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.finite",
				"Given value is not finite",
				Infinity,
				"Number.isFinite(expected) to be true"
			)
		);
	});
});
