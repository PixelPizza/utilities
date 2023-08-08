import { Assert } from "../../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("DateRange tests", () => {
	describe("Max tests", () => {
		test.each([
			[new Date(2020, 1, 1), new Date(2020, 1, 1)],
			[new Date(2020, 1, 1), new Date(2020, 1, 2)],
			[new Date(2020, 1, 1), new Date(2020, 2, 1)],
			[new Date(2020, 1, 1), new Date(2021, 1, 1)]
		])("GIVEN %s with max %s THEN does not throw", (value, maxDate) => {
			class Test {
				@Assert.DateRange(maxDate)
				public value = value;
			}

			expect(() => new Test()).not.toThrow();
		});

		test.each([
			[new Date(2020, 1, 2), new Date(2020, 1, 1)],
			[new Date(2020, 1, 1), new Date(2020, 0, 1)]
		])("GIVEN %s with max %s THEN throws", (value, maxDate) => {
			class Test {
				@Assert.DateRange(maxDate)
				public value = value;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.date.lessThanOrEqual",
					"Invalid Date value",
					value,
					`expected <= ${maxDate}`
				)
			);
		});
	});

	describe("Min/Max tests", () => {
		test.each([
			[new Date(2020, 1, 5), new Date(2020, 1, 1), new Date(2020, 1, 10)],
			[
				new Date(2001, 10, 12),
				new Date(2001, 10, 11),
				new Date(2001, 10, 13)
			],
			[new Date(2006, 9, 3), new Date(2006, 9, 3), new Date(2006, 9, 3)]
		])(
			"GIVEN %s with min %s and max %s THEN does not throw",
			(value, minDate, maxDate) => {
				class Test {
					@Assert.DateRange(minDate, maxDate)
					public value = value;
				}

				expect(() => new Test()).not.toThrow();
			}
		);

		test.each([
			[new Date(2020, 1, 0), new Date(2020, 1, 1), new Date(2020, 1, 10)],
			[new Date(2001, 1, 1), new Date(2001, 2, 1), new Date(2001, 2, 2)]
		])(
			"GIVEN %s with min %s and max %s THEN throws",
			(value, minDate, maxDate) => {
				class Test {
					@Assert.DateRange(minDate, maxDate)
					public value = value;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.date.greaterThanOrEqual",
						"Invalid Date value",
						value,
						`expected >= ${minDate}`
					)
				);
			}
		);

		test.each([
			[
				new Date(2020, 1, 11),
				new Date(2020, 1, 1),
				new Date(2020, 1, 10)
			],
			[new Date(2001, 1, 1), new Date(2001, 0, 1), new Date(2001, 0, 2)]
		])(
			"GIVEN %s with min %s and max %s THEN throws",
			(value, minDate, maxDate) => {
				class Test {
					@Assert.DateRange(minDate, maxDate)
					public value = value;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.date.lessThanOrEqual",
						"Invalid Date value",
						value,
						`expected <= ${maxDate}`
					)
				);
			}
		);
	});

	describe("Options tests", () => {
		describe("Equal tests", () => {
			test.each([
				[new Date(2020, 1, 1), new Date(2020, 1, 1)],
				[new Date(2001, 11, 30), new Date(2001, 11, 30)],
				[new Date(1999, 4, 12), new Date(1999, 4, 12)]
			])("GIVEN %s with equal %s THEN does not throw", (date, equal) => {
				class Test {
					@Assert.DateRange({ equal })
					public value = date;
				}

				expect(() => new Test()).not.toThrow();
			});

			test.each([
				[new Date(2020, 1, 2), new Date(2020, 1, 1)],
				[new Date(2001, 11, 30), new Date(1999, 4, 12)],
				[new Date(1999, 4, 12), new Date(2001, 11, 30)]
			])("GIVEN %s with equal %s THEN throws", (date, equal) => {
				class Test {
					@Assert.DateRange({ equal })
					public value = date;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.date.equal",
						"Invalid Date value",
						date,
						`expected === ${equal}`
					)
				);
			});
		});

		describe("NotEqual tests", () => {
			test.each([
				[new Date(2020, 1, 2), new Date(2020, 1, 1)],
				[new Date(2001, 11, 30), new Date(1999, 4, 12)],
				[new Date(1999, 4, 12), new Date(2001, 11, 30)]
			])(
				"GIVEN %s with not equal %s THEN does not throw",
				(date, notEqual) => {
					class Test {
						@Assert.DateRange({ notEqual })
						public value = date;
					}

					expect(() => new Test()).not.toThrow();
				}
			);

			test.each([
				[new Date(2020, 1, 1), new Date(2020, 1, 1)],
				[new Date(2001, 11, 30), new Date(2001, 11, 30)],
				[new Date(1999, 4, 12), new Date(1999, 4, 12)]
			])("GIVEN %s with not equal %s THEN throws", (date, notEqual) => {
				class Test {
					@Assert.DateRange({ notEqual })
					public value = date;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.date.notEqual",
						"Invalid Date value",
						date,
						`expected !== ${notEqual}`
					)
				);
			});
		});

		describe("GreaterThan tests", () => {
			test.each([
				[new Date(2020, 1, 2), new Date(2020, 1, 1)],
				[new Date(2001, 11, 30), new Date(1999, 4, 12)],
				[new Date(2003, 9, 12), new Date(2000, 10, 12)]
			])(
				"GIVEN %s with greater than %s THEN does not throw",
				(date, greaterThan) => {
					class Test {
						@Assert.DateRange({ greaterThan })
						public value = date;
					}

					expect(() => new Test()).not.toThrow();
				}
			);

			test.each([
				[new Date(2020, 1, 1), new Date(2020, 1, 1)],
				[new Date(2001, 11, 30), new Date(2001, 11, 31)],
				[new Date(1999, 4, 12), new Date(2003, 9, 12)]
			])(
				"GIVEN %s with greater than %s THEN throws",
				(date, greaterThan) => {
					class Test {
						@Assert.DateRange({ greaterThan })
						public value = date;
					}

					expect(() => new Test()).toThrow(
						new ExpectedConstraintError(
							"s.date.greaterThan",
							"Invalid Date value",
							date,
							`expected > ${greaterThan}`
						)
					);
				}
			);
		});

		describe("LessThan tests", () => {
			test.each([
				[new Date(2020, 0, 31), new Date(2020, 1, 1)],
				[new Date(1999, 4, 12), new Date(2001, 11, 30)],
				[new Date(2003, 9, 12), new Date(2003, 9, 13)]
			])(
				"GIVEN %s with less than %s THEN does not throw",
				(date, lessThan) => {
					class Test {
						@Assert.DateRange({ lessThan })
						public value = date;
					}

					expect(() => new Test()).not.toThrow();
				}
			);

			test.each([
				[new Date(2020, 1, 1), new Date(2020, 1, 1)],
				[new Date(2001, 11, 30), new Date(1999, 4, 12)],
				[new Date(2003, 9, 13), new Date(2003, 9, 12)]
			])("GIVEN %s with less than %s THEN throws", (date, lessThan) => {
				class Test {
					@Assert.DateRange({ lessThan })
					public value = date;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.date.lessThan",
						"Invalid Date value",
						date,
						`expected < ${lessThan}`
					)
				);
			});
		});
	});
});
