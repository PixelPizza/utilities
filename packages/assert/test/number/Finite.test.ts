import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Finite tests", () => {
	test.each([
		-4359853954853409, -4343, -84, -1, 0, 1, 84, 4343, 4359853954853409
	])("GIVEN %i THEN does not throw", (value) => {
		class Test {
			@Assert.Finite
			public number = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each([Infinity, NaN])("GIVEN %s THEN throws", (value) => {
		class Test {
			@Assert.Finite
			public number = value;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.finite",
				"Given value is not finite",
				value,
				"Number.isFinite(expected) to be true"
			)
		);
	});
});
