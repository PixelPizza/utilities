import { Assert } from "../../src";
import {
	CombinedError,
	ExpectedConstraintError,
	ValidationError
} from "@sapphire/shapeshift";

describe("Positive tests", () => {
	test("GIVEN positive number THEN does not throw", () => {
		class Test {
			@Assert.Positive
			public number = 1;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN positive bigint THEN does not throw", () => {
		class Test {
			@Assert.Positive
			public bigint = 1n;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN negative number THEN throws", () => {
		class Test {
			@Assert.Positive
			public number = -1;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.greaterThanOrEqual",
					"Invalid number value",
					-1,
					"expected >= 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					-1
				)
			])
		);
	});

	test("GIVEN negative bigint THEN throws", () => {
		class Test {
			@Assert.Positive
			public bigint = -1n;
		}

		expect(() => new Test()).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.bigint.greaterThanOrEqual",
					"Invalid bigint value",
					-1n,
					"expected >= 0"
				),
				new ValidationError(
					"s.number",
					"Expected a number primitive",
					-1n
				)
			])
		);
	});

	test("GIVEN zero number THEN does not throw", () => {
		class Test {
			@Assert.Positive
			public number = 0;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("GIVEN zero bigint THEN does not throw", () => {
		class Test {
			@Assert.Positive
			public bigint = 0n;
		}

		expect(() => new Test()).not.toThrow();
	});
});
