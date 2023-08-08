import { Assert } from "../../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("SafeInt tests", () => {
	test.each([
		Number.MIN_SAFE_INTEGER,
		Number.MIN_SAFE_INTEGER + 423432,
		0,
		Number.MAX_SAFE_INTEGER - 423432,
		Number.MAX_SAFE_INTEGER
	])("GIVEN %i THEN does not throw", (value) => {
		class Test {
			@Assert.SafeInt
			public number = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each([
		Number.MIN_SAFE_INTEGER - 423432,
		Number.MIN_SAFE_INTEGER - 1,
		Number.MAX_SAFE_INTEGER + 1,
		Number.MAX_SAFE_INTEGER + 423432
	])("GIVEN %i THEN throws", (value) => {
		class Test {
			@Assert.SafeInt
			public number = value;
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.safeInt",
				"Given value is not a safe integer",
				value,
				"Number.isSafeInteger(expected) to be true"
			)
		);
	});
});
