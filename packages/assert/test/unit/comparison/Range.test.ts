import { Assert } from "../../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Range tests", () => {
	describe("Property decorator", () => {
		describe("Max tests", () => {
			test.each<[number | bigint, number | bigint]>([
				[1, 5],
				[4, 5],
				[5, 5],
				[91, 93],
				[231321231, 231321232],
				[44.32, 44.5],
				[1n, 5n],
				[4n, 5n],
				[5n, 5n],
				[91n, 93n],
				[231321231n, 231321232n]
			])(
				"GIVEN %s with max %s THEN does not throw",
				(value, maxValue) => {
					class Test {
						@Assert.Range(maxValue)
						public value = value;
					}

					expect(() => new Test()).not.toThrow();
				}
			);

			test.each<[number | bigint, number | bigint]>([
				[6, 5],
				[3, 1],
				[32, 11],
				[3213, 1],
				[34.32, 12.3],
				[323.3, 12],
				[6n, 5n],
				[3n, 1n],
				[32n, 11n],
				[3213n, 1n]
			])("GIVEN %s with max %s THEN throws", (value, maxValue) => {
				class Test {
					@Assert.Range(maxValue)
					public value = value;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						`s.${
							typeof value as "number" | "bigint"
						}.lessThanOrEqual`,
						`Invalid ${typeof value} value`,
						value,
						`expected <= ${maxValue}`
					)
				);
			});
		});

		describe("Min/Max tests", () => {
			test.each<[number | bigint, number | bigint, number | bigint]>([
				[6, 5, 10],
				[3, 3, 3],
				[4332, 303, 329329],
				[34242, 1, 342424432432],
				[322.3, 300, 340],
				[322.2, 322.1, 322.3],
				[6n, 6n, 10n],
				[3n, 3n, 3n],
				[4332n, 303n, 329329n],
				[34242n, 1n, 342424432432n]
			])(
				"GIVEN %s with min %s and max %s THEN does not throw",
				(value, minValue, maxValue) => {
					class Test {
						@Assert.Range(minValue, maxValue)
						public value = value;
					}

					expect(() => new Test()).not.toThrow();
				}
			);

			test.each<[number | bigint, number | bigint, number | bigint]>([
				[4, 5, 10],
				[33, 34, 34],
				[30.1, 31, 31.1],
				[30, 30.1, 30.1],
				[12.3, 12.4, 12.5],
				[4n, 5n, 10n],
				[33n, 34n, 34n]
			])(
				"GIVEN %s with min %s and max %s THEN throws",
				(value, minValue, maxValue) => {
					class Test {
						@Assert.Range(minValue, maxValue)
						public value = value;
					}

					expect(() => new Test()).toThrow(
						new ExpectedConstraintError(
							`s.${
								typeof value as "number" | "bigint"
							}.greaterThanOrEqual`,
							`Invalid ${typeof value} value`,
							value,
							`expected >= ${minValue}`
						)
					);
				}
			);

			test.each<[number | bigint, number | bigint, number | bigint]>([
				[11, 5, 10],
				[33, 32, 32],
				[33.3, 32, 33.2],
				[11n, 5n, 10n],
				[33n, 32n, 32n]
			])(
				"GIVEN number with invalid max THEN throws",
				(value, minValue, maxValue) => {
					class Test {
						@Assert.Range(minValue, maxValue)
						public value = value;
					}

					expect(() => new Test()).toThrow(
						new ExpectedConstraintError(
							`s.${
								typeof value as "number" | "bigint"
							}.lessThanOrEqual`,
							`Invalid ${typeof value} value`,
							value,
							`expected <= ${maxValue}`
						)
					);
				}
			);
		});

		describe("Options tests", () => {
			describe("Equal tests", () => {
				test.each<[number | bigint, number | bigint]>([
					[5, 5],
					[33, 33],
					[32332, 32332],
					[33.3, 33.3],
					[5n, 5n],
					[33n, 33n],
					[32332n, 32332n]
				])(
					"GIVEN %s with equal %s THEN does not throw",
					(value, equal) => {
						class Test {
							@Assert.Range({ equal })
							public value = value;
						}

						expect(() => new Test()).not.toThrow();
					}
				);

				test.each<[number | bigint, number | bigint]>([
					[6, 5],
					[3, 1],
					[32, 45],
					[32234, 4343],
					[32.3, 45.43],
					[32.3, 32.4],
					[32.3, 32.2],
					[6n, 5n],
					[3n, 1n],
					[32n, 45n],
					[32234n, 4343n]
				])("GIVEN %s with equal %s THEN throws", (value, equal) => {
					class Test {
						@Assert.Range({ equal })
						public value = value;
					}

					expect(() => new Test()).toThrow(
						new ExpectedConstraintError(
							`s.${typeof value as "number" | "bigint"}.equal`,
							`Invalid ${typeof value} value`,
							value,
							`expected === ${equal}`
						)
					);
				});
			});

			describe("NotEqual tests", () => {
				test.each<[number | bigint, number | bigint]>([
					[4, 5],
					[1, 3],
					[33, 56],
					[322323, 4334],
					[33.3, 33.4],
					[33.3, 33.2],
					[4n, 5n],
					[1n, 3n],
					[33n, 56n],
					[322323n, 4334n]
				])(
					"GIVEN %s with not equal %s THEN does not throw",
					(value, notEqual) => {
						class Test {
							@Assert.Range({ notEqual })
							public value = value;
						}

						expect(() => new Test()).not.toThrow();
					}
				);

				test.each<[number | bigint, number | bigint]>([
					[5, 5],
					[1, 1],
					[33, 33],
					[43234, 43234],
					[33.3, 33.3],
					[5n, 5n],
					[1n, 1n],
					[33n, 33n],
					[43234n, 43234n]
				])(
					"GIVEN %s with not equal %s THEN throws",
					(value, notEqual) => {
						class Test {
							@Assert.Range({ notEqual })
							public value = value;
						}

						expect(() => new Test()).toThrow(
							new ExpectedConstraintError(
								`s.${
									typeof value as "number" | "bigint"
								}.notEqual`,
								`Invalid ${typeof value} value`,
								value,
								`expected !== ${notEqual}`
							)
						);
					}
				);
			});

			describe("GreaterThan tests", () => {
				test.each<[number | bigint, number | bigint]>([
					[6, 5],
					[3, 1],
					[43, 32],
					[432342, 43244],
					[33.3, 33.2],
					[33.1, 33],
					[6n, 5n],
					[3n, 1n],
					[43n, 32n],
					[432342n, 43244n]
				])(
					"GIVEN %s with greater than %s THEN does not throw",
					(value, greaterThan) => {
						class Test {
							@Assert.Range({ greaterThan })
							public value = value;
						}

						expect(() => new Test()).not.toThrow();
					}
				);

				test.each<[number | bigint, number | bigint]>([
					[5, 5],
					[5, 6],
					[1, 3],
					[32, 43],
					[43244, 432342],
					[33.2, 33.3],
					[33, 33.1],
					[5n, 6n],
					[1n, 3n],
					[32n, 43n],
					[43244n, 432342n]
				])(
					"GIVEN %s with greater than %s THEN throws",
					(value, greaterThan) => {
						class Test {
							@Assert.Range({ greaterThan })
							public value = value;
						}

						expect(() => new Test()).toThrow(
							new ExpectedConstraintError(
								`s.${
									typeof value as "number" | "bigint"
								}.greaterThan`,
								`Invalid ${typeof value} value`,
								value,
								`expected > ${greaterThan}`
							)
						);
					}
				);
			});

			describe("LessThan tests", () => {
				test.each<[number | bigint, number | bigint]>([
					[5, 6],
					[1, 3],
					[32, 43],
					[43244, 432342],
					[33.2, 33.3],
					[33, 33.1],
					[5n, 6n],
					[1n, 3n],
					[32n, 43n],
					[43244n, 432342n]
				])(
					"GIVEN %s with less than %s THEN does not throw",
					(value, lessThan) => {
						class Test {
							@Assert.Range({ lessThan })
							public value = value;
						}

						expect(() => new Test()).not.toThrow();
					}
				);

				test.each<[number | bigint, number | bigint]>([
					[6, 5],
					[3, 1],
					[43, 32],
					[432342, 43244],
					[33.3, 33.2],
					[33.1, 33],
					[6n, 5n],
					[3n, 1n],
					[43n, 32n],
					[432342n, 43244n]
				])(
					"GIVEN %s with less than %s THEN throws",
					(value, lessThan) => {
						class Test {
							@Assert.Range({ lessThan })
							public value = value;
						}

						expect(() => new Test()).toThrow(
							new ExpectedConstraintError(
								`s.${
									typeof value as "number" | "bigint"
								}.lessThan`,
								`Invalid ${typeof value} value`,
								value,
								`expected < ${lessThan}`
							)
						);
					}
				);
			});

			describe("Assertion disabled tests", () => {
				test("GIVEN invalid number with assertion disabled THEN does not throw", () => {
					class Test {
						@Assert.Range({ min: 4, assertionEnabled: false })
						public value = 3;
					}

					expect(() => new Test()).not.toThrow();
				});
			});
		});
	});

	describe("Parameter decorator", () => {
		describe("Max tests", () => {
			test.each<[number | bigint, number | bigint]>([
				[1, 5],
				[4, 5],
				[5, 5],
				[91, 93],
				[231321231, 231321232],
				[44.32, 44.5],
				[1n, 5n],
				[4n, 5n],
				[5n, 5n],
				[91n, 93n],
				[231321231n, 231321232n]
			])(
				"GIVEN %s with max %s THEN does not throw",
				(value, maxValue) => {
					class Test {
						@Assert.ValidateParameters
						public testFunc(
							@Assert.Range(maxValue) value: unknown
						) {
							return value;
						}
					}

					expect(() => new Test().testFunc(value)).not.toThrow();
				}
			);

			test.each<[number | bigint, number | bigint]>([
				[6, 5],
				[3, 1],
				[32, 11],
				[3213, 1],
				[34.32, 12.3],
				[323.3, 12],
				[6n, 5n],
				[3n, 1n],
				[32n, 11n],
				[3213n, 1n]
			])("GIVEN %s with max %s THEN throws", (value, maxValue) => {
				class Test {
					@Assert.ValidateParameters
					public testFunc(@Assert.Range(maxValue) value: unknown) {
						return value;
					}
				}

				expect(() => new Test().testFunc(value)).toThrow(
					new ExpectedConstraintError(
						`s.${
							typeof value as "number" | "bigint"
						}.lessThanOrEqual`,
						`Invalid ${typeof value} value`,
						value,
						`expected <= ${maxValue}`
					)
				);
			});
		});

		describe("Min/Max tests", () => {
			test.each<[number | bigint, number | bigint, number | bigint]>([
				[6, 5, 10],
				[3, 3, 3],
				[4332, 303, 329329],
				[34242, 1, 342424432432],
				[322.3, 300, 340],
				[322.2, 322.1, 322.3],
				[6n, 6n, 10n],
				[3n, 3n, 3n],
				[4332n, 303n, 329329n],
				[34242n, 1n, 342424432432n]
			])(
				"GIVEN %s with min %s and max %s THEN does not throw",
				(value, minValue, maxValue) => {
					class Test {
						@Assert.ValidateParameters
						public testFunc(
							@Assert.Range(minValue, maxValue) value: unknown
						) {
							return value;
						}
					}

					expect(() => new Test().testFunc(value)).not.toThrow();
				}
			);

			test.each<[number | bigint, number | bigint, number | bigint]>([
				[4, 5, 10],
				[33, 34, 34],
				[30.1, 31, 31.1],
				[30, 30.1, 30.1],
				[12.3, 12.4, 12.5],
				[4n, 5n, 10n],
				[33n, 34n, 34n]
			])(
				"GIVEN %s with min %s and max %s THEN throws",
				(value, minValue, maxValue) => {
					class Test {
						@Assert.ValidateParameters
						public testFunc(
							@Assert.Range(minValue, maxValue) value: unknown
						) {
							return value;
						}
					}

					expect(() => new Test().testFunc(value)).toThrow(
						new ExpectedConstraintError(
							`s.${
								typeof value as "number" | "bigint"
							}.greaterThanOrEqual`,
							`Invalid ${typeof value} value`,
							value,
							`expected >= ${minValue}`
						)
					);
				}
			);

			test.each<[number | bigint, number | bigint, number | bigint]>([
				[11, 5, 10],
				[33, 32, 32],
				[33.3, 32, 33.2],
				[11n, 5n, 10n],
				[33n, 32n, 32n]
			])(
				"GIVEN number with invalid max THEN throws",
				(value, minValue, maxValue) => {
					class Test {
						@Assert.ValidateParameters
						public testFunc(
							@Assert.Range(minValue, maxValue) value: unknown
						) {
							return value;
						}
					}

					expect(() => new Test().testFunc(value)).toThrow(
						new ExpectedConstraintError(
							`s.${
								typeof value as "number" | "bigint"
							}.lessThanOrEqual`,
							`Invalid ${typeof value} value`,
							value,
							`expected <= ${maxValue}`
						)
					);
				}
			);
		});

		describe("Options tests", () => {
			describe("Equal tests", () => {
				test.each<[number | bigint, number | bigint]>([
					[5, 5],
					[33, 33],
					[32332, 32332],
					[33.3, 33.3],
					[5n, 5n],
					[33n, 33n],
					[32332n, 32332n]
				])(
					"GIVEN %s with equal %s THEN does not throw",
					(value, equal) => {
						class Test {
							@Assert.ValidateParameters
							public testFunc(
								@Assert.Range({ equal }) value: unknown
							) {
								return value;
							}
						}

						expect(() => new Test().testFunc(value)).not.toThrow();
					}
				);

				test.each<[number | bigint, number | bigint]>([
					[6, 5],
					[3, 1],
					[32, 45],
					[32234, 4343],
					[32.3, 45.43],
					[32.3, 32.4],
					[32.3, 32.2],
					[6n, 5n],
					[3n, 1n],
					[32n, 45n],
					[32234n, 4343n]
				])("GIVEN %s with equal %s THEN throws", (value, equal) => {
					class Test {
						@Assert.ValidateParameters
						public testFunc(
							@Assert.Range({ equal }) value: unknown
						) {
							return value;
						}
					}

					expect(() => new Test().testFunc(value)).toThrow(
						new ExpectedConstraintError(
							`s.${typeof value as "number" | "bigint"}.equal`,
							`Invalid ${typeof value} value`,
							value,
							`expected === ${equal}`
						)
					);
				});
			});

			describe("NotEqual tests", () => {
				test.each<[number | bigint, number | bigint]>([
					[4, 5],
					[1, 3],
					[33, 56],
					[322323, 4334],
					[33.3, 33.4],
					[33.3, 33.2],
					[4n, 5n],
					[1n, 3n],
					[33n, 56n],
					[322323n, 4334n]
				])(
					"GIVEN %s with not equal %s THEN does not throw",
					(value, notEqual) => {
						class Test {
							@Assert.ValidateParameters
							public testFunc(
								@Assert.Range({ notEqual }) value: unknown
							) {
								return value;
							}
						}

						expect(() => new Test().testFunc(value)).not.toThrow();
					}
				);

				test.each<[number | bigint, number | bigint]>([
					[5, 5],
					[1, 1],
					[33, 33],
					[43234, 43234],
					[33.3, 33.3],
					[5n, 5n],
					[1n, 1n],
					[33n, 33n],
					[43234n, 43234n]
				])(
					"GIVEN %s with not equal %s THEN throws",
					(value, notEqual) => {
						class Test {
							@Assert.ValidateParameters
							public testFunc(
								@Assert.Range({ notEqual }) value: unknown
							) {
								return value;
							}
						}

						expect(() => new Test().testFunc(value)).toThrow(
							new ExpectedConstraintError(
								`s.${
									typeof value as "number" | "bigint"
								}.notEqual`,
								`Invalid ${typeof value} value`,
								value,
								`expected !== ${notEqual}`
							)
						);
					}
				);
			});

			describe("GreaterThan tests", () => {
				test.each<[number | bigint, number | bigint]>([
					[6, 5],
					[3, 1],
					[43, 32],
					[432342, 43244],
					[33.3, 33.2],
					[33.1, 33],
					[6n, 5n],
					[3n, 1n],
					[43n, 32n],
					[432342n, 43244n]
				])(
					"GIVEN %s with greater than %s THEN does not throw",
					(value, greaterThan) => {
						class Test {
							@Assert.ValidateParameters
							public testFunc(
								@Assert.Range({ greaterThan })
								value: unknown
							) {
								return value;
							}
						}

						expect(() => new Test().testFunc(value)).not.toThrow();
					}
				);

				test.each<[number | bigint, number | bigint]>([
					[5, 5],
					[5, 6],
					[1, 3],
					[32, 43],
					[43244, 432342],
					[33.2, 33.3],
					[33, 33.1],
					[5n, 6n],
					[1n, 3n],
					[32n, 43n],
					[43244n, 432342n]
				])(
					"GIVEN %s with greater than %s THEN throws",
					(value, greaterThan) => {
						class Test {
							@Assert.ValidateParameters
							public testFunc(
								@Assert.Range({ greaterThan }) value: unknown
							) {
								return value;
							}
						}

						expect(() => new Test().testFunc(value)).toThrow(
							new ExpectedConstraintError(
								`s.${
									typeof value as "number" | "bigint"
								}.greaterThan`,
								`Invalid ${typeof value} value`,
								value,
								`expected > ${greaterThan}`
							)
						);
					}
				);
			});

			describe("LessThan tests", () => {
				test.each<[number | bigint, number | bigint]>([
					[5, 6],
					[1, 3],
					[32, 43],
					[43244, 432342],
					[33.2, 33.3],
					[33, 33.1],
					[5n, 6n],
					[1n, 3n],
					[32n, 43n],
					[43244n, 432342n]
				])(
					"GIVEN %s with less than %s THEN does not throw",
					(value, lessThan) => {
						class Test {
							@Assert.ValidateParameters
							public testFunc(
								@Assert.Range({ lessThan }) value: unknown
							) {
								return value;
							}
						}

						expect(() => new Test().testFunc(value)).not.toThrow();
					}
				);

				test.each<[number | bigint, number | bigint]>([
					[6, 5],
					[3, 1],
					[43, 32],
					[432342, 43244],
					[33.3, 33.2],
					[33.1, 33],
					[6n, 5n],
					[3n, 1n],
					[43n, 32n],
					[432342n, 43244n]
				])(
					"GIVEN %s with less than %s THEN throws",
					(value, lessThan) => {
						class Test {
							@Assert.ValidateParameters
							public testFunc(
								@Assert.Range({ lessThan }) value: unknown
							) {
								return value;
							}
						}

						expect(() => new Test().testFunc(value)).toThrow(
							new ExpectedConstraintError(
								`s.${
									typeof value as "number" | "bigint"
								}.lessThan`,
								`Invalid ${typeof value} value`,
								value,
								`expected < ${lessThan}`
							)
						);
					}
				);
			});

			describe("Assertion disabled tests", () => {
				test("GIVEN invalid number with assertion disabled THEN does not throw", () => {
					class Test {
						@Assert.ValidateParameters
						public testFunc(
							@Assert.Range({ min: 4, assertionEnabled: false })
							value: unknown
						) {
							return value;
						}
					}

					expect(() => new Test().testFunc(3)).not.toThrow();
				});
			});
		});
	});
});
