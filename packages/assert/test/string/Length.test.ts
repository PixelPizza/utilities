import { Assert } from "../../src";
import { ExpectedConstraintError, ValidationError } from "@sapphire/shapeshift";

describe("Length tests", () => {
	describe("Max tests", () => {
		test("GIVEN string with valid max length THEN does not throw", () => {
			class Test {
				@Assert.Length(5)
				public value = "12345";
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN string with invalid max length THEN throws", () => {
			class Test {
				@Assert.Length(5)
				public value = "123456";
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.lengthLessThanOrEqual",
					"Invalid string length",
					"123456",
					"expected.length <= 5"
				)
			);
		});
	});

	describe("Min/Max tests", () => {
		test("GIVEN string with valid min/max length THEN does not throw", () => {
			class Test {
				@Assert.Length(5, 10)
				public value = "123456";
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN string with invalid min length THEN throws", () => {
			class Test {
				@Assert.Length(5, 10)
				public value = "1234";
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.lengthGreaterThanOrEqual",
					"Invalid string length",
					"1234",
					"expected.length >= 5"
				)
			);
		});

		test("GIVEN string with invalid max length THEN throws", () => {
			class Test {
				@Assert.Length(5, 10)
				public value = "12345678901";
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.lengthLessThanOrEqual",
					"Invalid string length",
					"12345678901",
					"expected.length <= 10"
				)
			);
		});
	});

	describe("Options tests", () => {
		describe("Equal tests", () => {
			test("GIVEN string with valid equal length THEN does not throw", () => {
				class Test {
					@Assert.Length({ equal: 5 })
					public value = "12345";
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN string with invalid equal length THEN throws", () => {
				class Test {
					@Assert.Length({ equal: 5 })
					public value = "123456";
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.string.lengthEqual",
						"Invalid string length",
						"123456",
						"expected.length === 5"
					)
				);
			});
		});

		describe("NotEqual tests", () => {
			test("GIVEN string with valid not equal length THEN does not throw", () => {
				class Test {
					@Assert.Length({ notEqual: 5 })
					public value = "123456";
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN string with invalid not equal length THEN throws", () => {
				class Test {
					@Assert.Length({ notEqual: 5 })
					public value = "12345";
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.string.lengthNotEqual",
						"Invalid string length",
						"12345",
						"expected.length !== 5"
					)
				);
			});
		});

		describe("GreaterThan tests", () => {
			test("GIVEN string with valid greater than length THEN does not throw", () => {
				class Test {
					@Assert.Length({ greaterThan: 5 })
					public value = "123456";
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN string with invalid greater than length THEN throws", () => {
				class Test {
					@Assert.Length({ greaterThan: 5 })
					public value = "12345";
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.string.lengthGreaterThan",
						"Invalid string length",
						"12345",
						"expected.length > 5"
					)
				);
			});
		});

		describe("LessThan tests", () => {
			test("GIVEN string with valid less than length THEN does not throw", () => {
				class Test {
					@Assert.Length({ lessThan: 5 })
					public value = "1234";
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN string with invalid less than length THEN throws", () => {
				class Test {
					@Assert.Length({ lessThan: 5 })
					public value = "12345";
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.string.lengthLessThan",
						"Invalid string length",
						"12345",
						"expected.length < 5"
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
