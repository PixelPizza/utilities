import { Assert } from "../../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Finite tests", () => {
	test.each<number>([
		-4359853954853409, -4343, -84, -1, 0, 1, 84, 4343, 4359853954853409
	])("GIVEN %i THEN does not throw", (value) => {
		class Test {
			@Assert.Finite
			public number = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN non-finite number with assertion disabled THEN does not throw", () => {
		class Test {
			@Assert.Finite({ assertionEnabled: false })
			public number = Infinity;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each<number>([Infinity, NaN])("GIVEN %s THEN throws", (value) => {
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
