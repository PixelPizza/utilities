import { Assert } from "../../src";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Range tests", () => {
	describe("Max tests", () => {
		test("GIVEN number with valid max THEN does not throw", () => {
			class Test {
				@Assert.Range(5)
				public value = 1;
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN bigint with valid max THEN does not throw", () => {
			class Test {
				@Assert.Range(5n)
				public value = 1n;
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN number with invalid max THEN throws", () => {
			class Test {
				@Assert.Range(5)
				public value = 6;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.number.lessThanOrEqual",
					"Invalid number value",
					6,
					"expected <= 5"
				)
			);
		});

		test("GIVEN bigint with invalid max THEN throws", () => {
			class Test {
				@Assert.Range(5n)
				public value = 6n;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.bigint.lessThanOrEqual",
					"Invalid bigint value",
					6n,
					"expected <= 5n"
				)
			);
		});
	});

	describe("Min/Max tests", () => {
		test("GIVEN number with valid min/max THEN does not throw", () => {
			class Test {
				@Assert.Range(5, 10)
				public value = 6;
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN bigint with valid min/max THEN does not throw", () => {
			class Test {
				@Assert.Range(5n, 10n)
				public value = 6n;
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN number with invalid min THEN throws", () => {
			class Test {
				@Assert.Range(5, 10)
				public value = 4;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.number.greaterThanOrEqual",
					"Invalid number value",
					4,
					"expected >= 5"
				)
			);
		});

		test("GIVEN bigint with invalid min THEN throws", () => {
			class Test {
				@Assert.Range(5n, 10n)
				public value = 4n;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.bigint.greaterThanOrEqual",
					"Invalid bigint value",
					4n,
					"expected >= 5n"
				)
			);
		});

		test("GIVEN number with invalid max THEN throws", () => {
			class Test {
				@Assert.Range(5, 10)
				public value = 11;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.number.lessThanOrEqual",
					"Invalid number value",
					11,
					"expected <= 10"
				)
			);
		});

		test("GIVEN bigint with invalid max THEN throws", () => {
			class Test {
				@Assert.Range(5n, 10n)
				public value = 11n;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.bigint.lessThanOrEqual",
					"Invalid bigint value",
					11n,
					"expected <= 10n"
				)
			);
		});
	});

	describe("Options tests", () => {
		describe("Equal tests", () => {
			test("GIVEN number with valid equal THEN does not throw", () => {
				class Test {
					@Assert.Range({ equal: 5 })
					public value = 5;
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN bigint with valid equal THEN does not throw", () => {
				class Test {
					@Assert.Range({ equal: 5n })
					public value = 5n;
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN number with invalid equal THEN throws", () => {
				class Test {
					@Assert.Range({ equal: 5 })
					public value = 6;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.number.equal",
						"Invalid number value",
						6,
						"expected === 5"
					)
				);
			});

			test("GIVEN bigint with invalid equal THEN throws", () => {
				class Test {
					@Assert.Range({ equal: 5n })
					public value = 6n;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.bigint.equal",
						"Invalid bigint value",
						6n,
						"expected === 5n"
					)
				);
			});
		});

		describe("NotEqual tests", () => {
			test("GIVEN number with valid not equal THEN does not throw", () => {
				class Test {
					@Assert.Range({ notEqual: 5 })
					public value = 4;
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN bigint with valid not equal THEN does not throw", () => {
				class Test {
					@Assert.Range({ notEqual: 5n })
					public value = 4n;
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN number with invalid not equal THEN throws", () => {
				class Test {
					@Assert.Range({ notEqual: 5 })
					public value = 5;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.number.notEqual",
						"Invalid number value",
						5,
						"expected !== 5"
					)
				);
			});

			test("GIVEN bigint with invalid not equal THEN throws", () => {
				class Test {
					@Assert.Range({ notEqual: 5n })
					public value = 5n;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.bigint.notEqual",
						"Invalid bigint value",
						5n,
						"expected !== 5n"
					)
				);
			});
		});

		describe("GreaterThan tests", () => {
			test("GIVEN number with valid greater than THEN does not throw", () => {
				class Test {
					@Assert.Range({ greaterThan: 5 })
					public value = 6;
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN bigint with valid greater than THEN does not throw", () => {
				class Test {
					@Assert.Range({ greaterThan: 5n })
					public value = 6n;
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN number with invalid greater than THEN throws", () => {
				class Test {
					@Assert.Range({ greaterThan: 5 })
					public value = 5;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.number.greaterThan",
						"Invalid number value",
						5,
						"expected > 5"
					)
				);
			});

			test("GIVEN bigint with invalid greater than THEN throws", () => {
				class Test {
					@Assert.Range({ greaterThan: 5n })
					public value = 5n;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.bigint.greaterThan",
						"Invalid bigint value",
						5n,
						"expected > 5n"
					)
				);
			});
		});

		describe("LessThan tests", () => {
			test("GIVEN number with valid less than THEN does not throw", () => {
				class Test {
					@Assert.Range({ lessThan: 5 })
					public value = 4;
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN bigint with valid less than THEN does not throw", () => {
				class Test {
					@Assert.Range({ lessThan: 5n })
					public value = 4n;
				}

				expect(() => new Test()).not.toThrow();
			});

			test("GIVEN number with invalid less than THEN throws", () => {
				class Test {
					@Assert.Range({ lessThan: 5 })
					public value = 5;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.number.lessThan",
						"Invalid number value",
						5,
						"expected < 5"
					)
				);
			});

			test("GIVEN bigint with invalid less than THEN throws", () => {
				class Test {
					@Assert.Range({ lessThan: 5n })
					public value = 5n;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						"s.bigint.lessThan",
						"Invalid bigint value",
						5n,
						"expected < 5n"
					)
				);
			});
		});
	});
});
