import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("DateRange tests", () => {
	describe("Max tests", () => {
		test("GIVEN date with valid max THEN does not throw", () => {
			class Test {
				@Assert.DateRange(new Date(2020, 1, 1))
				public value = new Date(2020, 1, 1);
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN date with invalid max THEN throws", () => {
			class Test {
				@Assert.DateRange(new Date(2020, 1, 1))
				public value = new Date(2020, 1, 2);
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.date.lessThanOrEqual",
					"Invalid Date value",
					"2020-02-01T23:00:00.000Z",
					"expected <= 2020-01-31T23:00:00.000Z"
				)
			);
		});
	});

	describe("Min/Max tests", () => {
		test("GIVEN date with valid min/max THEN does not throw", () => {
			class Test {
				@Assert.DateRange(new Date(2020, 1, 1), new Date(2020, 1, 10))
				public value = new Date(2020, 1, 5);
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN date with invalid min THEN throws", () => {
			class Test {
				@Assert.DateRange(new Date(2020, 1, 1), new Date(2020, 1, 10))
				public value = new Date(2020, 1, 0);
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.date.greaterThanOrEqual",
					"Invalid Date value",
					"2020-01-30T23:00:00.000Z",
					"expected >= 2020-01-31T23:00:00.000Z"
				)
			);
		});

		test("GIVEN date with invalid max THEN throws", () => {
			class Test {
				@Assert.DateRange(new Date(2020, 1, 1), new Date(2020, 1, 10))
				public value = new Date(2020, 1, 11);
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.date.lessThanOrEqual",
					"Invalid Date value",
					"2020-02-10T23:00:00.000Z",
					"expected <= 2020-02-09T23:00:00.000Z"
				)
			);
		});
	});

	describe("Options tests", () => {
		describe("Equal tests", () => {
			test("GIVEN date with valid equal THEN does not throw", () => {
				class Test {
					@Assert.DateRange({ equal: new Date(2020, 1, 1) })
					public value = new Date(2020, 1, 1);
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN date with invalid equal THEN throws", () => {
				class Test {
					@Assert.DateRange({ equal: new Date(2020, 1, 1) })
					public value = new Date(2020, 1, 2);
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.date.equal",
						"Invalid Date value",
						"2020-02-01T23:00:00.000Z",
						"expected === 2020-01-31T23:00:00.000Z"
					)
				);
			});
		});

		describe("NotEqual tests", () => {
			test("GIVEN date with valid not equal THEN does not throw", () => {
				class Test {
					@Assert.DateRange({ notEqual: new Date(2020, 1, 1) })
					public value = new Date(2020, 1, 2);
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN date with invalid not equal THEN throws", () => {
				class Test {
					@Assert.DateRange({ notEqual: new Date(2020, 1, 1) })
					public value = new Date(2020, 1, 1);
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.date.notEqual",
						"Invalid Date value",
						"2020-01-31T23:00:00.000Z",
						"expected !== 2020-01-31T23:00:00.000Z"
					)
				);
			});
		});

		describe("GreaterThan tests", () => {
			test("GIVEN date with valid greater than THEN does not throw", () => {
				class Test {
					@Assert.DateRange({ greaterThan: new Date(2020, 1, 1) })
					public value = new Date(2020, 1, 2);
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN date with invalid greater than THEN throws", () => {
				class Test {
					@Assert.DateRange({ greaterThan: new Date(2020, 1, 1) })
					public value = new Date(2020, 1, 1);
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.date.greaterThan",
						"Invalid Date value",
						"2020-01-31T23:00:00.000Z",
						"expected > 2020-01-31T23:00:00.000Z"
					)
				);
			});
		});

		describe("LessThan tests", () => {
			test("GIVEN date with valid less than THEN does not throw", () => {
				class Test {
					@Assert.DateRange({ lessThan: new Date(2020, 1, 1) })
					public value = new Date(2020, 0, 31);
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN date with invalid less than THEN throws", () => {
				class Test {
					@Assert.DateRange({ lessThan: new Date(2020, 1, 1) })
					public value = new Date(2020, 1, 1);
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.date.lessThan",
						"Invalid Date value",
						"2020-01-31T23:00:00.000Z",
						"expected < 2020-01-31T23:00:00.000Z"
					)
				);
			});
		});
	});
});
