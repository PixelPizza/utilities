import { Assert } from "../../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("Length tests", () => {
	describe("Max tests", () => {
		test.each([
			["12345", 5],
			["1234", 4],
			["123", 10],
			["1", 1],
			["", 1],
			["", 0]
		])("GIVEN %j with max %i THEN does not throw", (value, maxLength) => {
			class Test {
				@Assert.Length(maxLength)
				public value = value;
			}

			expect(() => new Test()).not.toThrow();
		});

		test.each([
			["123456", 5],
			["123456789", 5],
			["123456789", 8],
			["12", 1]
		])("GIVEN %j with max %i THEN throws", (value, maxLength) => {
			class Test {
				@Assert.Length(maxLength)
				public value = value;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.lengthLessThanOrEqual",
					"Invalid string length",
					value,
					`expected.length <= ${maxLength}`
				)
			);
		});
	});

	describe("Min/Max tests", () => {
		test.each([
			["123456", 5, 10],
			["123456789", 5, 10],
			["1234567890", 8, 10],
			["1", 0, 1],
			["1", 1, 1]
		])(
			"GIVEN %j with min %i and max %i THEN does not throw",
			(value, minLength, maxLength) => {
				class Test {
					@Assert.Length(minLength, maxLength)
					public value = value;
				}

				expect(() => new Test()).not.toThrow();
			}
		);

		test.each([
			["1234", 5, 10],
			["123", 4, 5],
			["", 1, 1]
		])(
			"GIVEN %j with min %i and max %i THEN throws",
			(value, minLength, maxLength) => {
				class Test {
					@Assert.Length(minLength, maxLength)
					public value = value;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.string.lengthGreaterThanOrEqual",
						"Invalid string length",
						value,
						`expected.length >= ${minLength}`
					)
				);
			}
		);

		test.each([
			["12345678901", 5, 10],
			["12", 1, 1],
			["4234322545452354534535", 1, 12]
		])(
			"GIVEN %j with min %i and max %i THEN throws",
			(value, minLength, maxLength) => {
				class Test {
					@Assert.Length(minLength, maxLength)
					public value = value;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.string.lengthLessThanOrEqual",
						"Invalid string length",
						value,
						`expected.length <= ${maxLength}`
					)
				);
			}
		);
	});

	describe("Options tests", () => {
		describe("Equal tests", () => {
			test.each([
				["12345", 5],
				["1", 1],
				["", 0],
				["313223232", 9],
				["345678384950682174", 18]
			])("GIVEN %j with equal %i THEN does not throw", (value, equal) => {
				class Test {
					@Assert.Length({ equal })
					public value = value;
				}

				expect(() => new Test()).not.toThrow();
			});

			test.each([
				["123456", 5],
				["4243", 3],
				["3312321", 11]
			])("GIVEN %j equal %i THEN throws", (value, equal) => {
				class Test {
					@Assert.Length({ equal })
					public value = value;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.string.lengthEqual",
						"Invalid string length",
						value,
						`expected.length === ${equal}`
					)
				);
			});
		});

		describe("NotEqual tests", () => {
			test.each([
				["123456", 5],
				["", 1],
				["12134", 6],
				["1", 2]
			])(
				"GIVEN %j with not equal %i THEN does not throw",
				(value, notEqual) => {
					class Test {
						@Assert.Length({ notEqual })
						public value = value;
					}

					expect(() => new Test()).not.toThrow();
				}
			);

			test.each([
				["12345", 5],
				["1", 1],
				["313223232", 9],
				["345678384950682174", 18]
			])("GIVEN %j not equal %i THEN throws", (value, notEqual) => {
				class Test {
					@Assert.Length({ notEqual })
					public value = value;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.string.lengthNotEqual",
						"Invalid string length",
						value,
						`expected.length !== ${notEqual}`
					)
				);
			});
		});

		describe("GreaterThan tests", () => {
			test.each([
				["123456", 5],
				["1", 0],
				["312312231", 8]
			])(
				"GIVEN %j with greater than %i THEN does not throw",
				(value, greaterThan) => {
					class Test {
						@Assert.Length({ greaterThan })
						public value = value;
					}

					expect(() => new Test()).not.toThrow();
				}
			);

			test.each([
				["12345", 5],
				["1", 1],
				["132", 4],
				["1232443434", 100]
			])(
				"GIVEN %j with greater than %i THEN throws",
				(value, greaterThan) => {
					class Test {
						@Assert.Length({ greaterThan })
						public value = value;
					}

					expect(() => new Test()).toThrow(
						new ExpectedConstraintError(
							"s.string.lengthGreaterThan",
							"Invalid string length",
							value,
							`expected.length > ${greaterThan}`
						)
					);
				}
			);
		});

		describe("LessThan tests", () => {
			test.each([
				["1234", 5],
				["1", 2],
				["", 1],
				["31312321", 14],
				["32234324", 100],
				["31232231123312123", 40]
			])(
				"GIVEN %j with less than %i THEN does not throw",
				(value, lessThan) => {
					class Test {
						@Assert.Length({ lessThan })
						public value = value;
					}

					expect(() => new Test()).not.toThrow();
				}
			);

			test.each([
				["12345", 5],
				["123", 3],
				["133232", 5]
			])("GIVEN %j with less than %i THEN throws", (value, lessThan) => {
				class Test {
					@Assert.Length({ lessThan })
					public value = value;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.string.lengthLessThan",
						"Invalid string length",
						value,
						`expected.length < ${lessThan}`
					)
				);
			});
		});
	});

	test("GIVEN boolean THEN throws", () => {
		class Test {
			@Assert.Length(5)
			public value = true;
		}

		expect(() => new Test()).toThrow(
			new ValidationError("s.string", "Expected a string primitive", true)
		);
	});
});
