import { Assert } from "../../../src/index";
import {
	CombinedError,
	ExpectedConstraintError,
	ValidationError
} from "@sapphire/shapeshift";

describe("Positive tests", () => {
	test.each([0, 1, 32, 85, 0n, 1n, 32n, 85n])(
		"GIVEN %s THEN does not throw",
		(value) => {
			class Test {
				@Assert.Positive
				public number = value;
			}

			expect(() => new Test()).not.toThrow();
		}
	);

	test("GIVEN negative number with assertion disabled THEN does not throw", () => {
		class Test {
			@Assert.Positive({ assertionEnabled: false })
			public number = -1;
		}

		expect(() => new Test()).not.toThrow();
	});

	// TODO: merge tests under this comment
	test.each([-1, -32, -85])("GIVEN %s THEN throws", (value) => {
		class Test {
			@Assert.Positive
			public number = value;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.greaterThanOrEqual",
					"Invalid number value",
					value,
					"expected >= 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					value
				)
			])
		);
	});

	test.each([-1n, -32n, -85n])("GIVEN %s THEN throws", (value) => {
		class Test {
			@Assert.Positive
			public bigint = value;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.bigint.greaterThanOrEqual",
					"Invalid bigint value",
					value,
					"expected >= 0"
				),
				new ValidationError(
					"s.number",
					"Expected a number primitive",
					value
				)
			])
		);
	});
});
