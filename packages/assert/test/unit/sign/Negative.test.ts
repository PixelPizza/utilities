import { Assert } from "../../../src";
import {
	CombinedError,
	ExpectedConstraintError,
	ValidationError
} from "@sapphire/shapeshift";

describe("Negative tests", () => {
	test.each([-1, -32, -85, -1n, -32n, -85n])(
		"GIVEN %s THEN does not throw",
		(value) => {
			try {
				const target: { test?: unknown } = {};
				Assert.Negative(target, "test");
				target.test = "hey";
			} catch (e) {
				console.log(e);
			}

			class Test {
				@Assert.Negative
				public number = value;
			}

			expect(() => new Test()).not.toThrow();
		}
	);

	// TODO: merge tests under this comment
	test.each([0, 1, 32, 85])("GIVEN %s THEN throws", (value) => {
		class Test {
			@Assert.Negative
			public number = value;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.lessThan",
					"Invalid number value",
					value,
					"expected < 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					value
				)
			])
		);
	});

	test.each([0n, 1n, 32n, 85n])("GIVEN %s THEN throws", (value) => {
		class Test {
			@Assert.Negative
			public bigint = value;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.bigint.lessThan",
					"Invalid bigint value",
					value,
					"expected < 0"
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
