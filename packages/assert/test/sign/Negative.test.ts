import { Assert } from "../../src";
import {
	CombinedError,
	ExpectedConstraintError,
	ValidationError
} from "@sapphire/shapeshift";

describe("Negative tests", () => {
	test("GIVEN negative number THEN does not throw", () => {
		class Test {
			@Assert.Negative
			public number = -1;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN negative bigint THEN does not throw", () => {
		class Test {
			@Assert.Negative
			public bigint = -1n;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN positive number THEN throws", () => {
		class Test {
			@Assert.Negative
			public number = 1;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.lessThan",
					"Invalid number value",
					1,
					"expected < 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					1
				)
			])
		);
	});

	test("GIVEN positive bigint THEN throws", () => {
		class Test {
			@Assert.Negative
			public bigint = 1n;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.bigint.lessThan",
					"Invalid bigint value",
					1n,
					"expected < 0"
				),
				new ValidationError(
					"s.number",
					"Expected a number primitive",
					1n
				)
			])
		);
	});

	test("GIVEN zero number THEN throws", () => {
		class Test {
			@Assert.Negative
			public number = 0;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.lessThan",
					"Invalid number value",
					0,
					"expected < 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					0
				)
			])
		);
	});

	test("GIVEN zero bigint THEN throws", () => {
		class Test {
			@Assert.Negative
			public bigint = 0n;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.bigint.lessThan",
					"Invalid bigint value",
					0n,
					"expected < 0"
				),
				new ValidationError(
					"s.number",
					"Expected a number primitive",
					0n
				)
			])
		);
	});
});
