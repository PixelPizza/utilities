import Assert from "../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Comparison decorators tests", () => {
	test("valid use of comparison decorators", () => {
		class Test {
			@Assert.Range(1, 4)
			@Assert.EqualTo(4)
			@Assert.DivisibleBy(2)
			public number?: number;

			@Assert.DateRange(new Date(2020, 1, 1))
			public date?: Date;

			@Assert.Unique
			public array?: string[];

			@Assert.ValidateParameters
			public setNumber(
				@Assert.Range(1, 4)
				@Assert.EqualTo(4)
				@Assert.DivisibleBy(2)
				number: number
			) {
				this.number = number;
				return this;
			}

			@Assert.ValidateParameters
			public setDate(@Assert.DateRange(new Date(2020, 1, 1)) date: Date) {
				this.date = date;
				return this;
			}

			@Assert.ValidateParameters
			public setArray(@Assert.Unique array: string[]) {
				this.array = array;
				return this;
			}
		}

		expect(() =>
			new Test()
				.setNumber(4)
				.setDate(new Date(2020, 1, 1))
				.setArray(["test", "test1"])
		).not.toThrow();
	});

	test("invalid use of comparison property decorators", () => {
		class Test {
			@Assert.Range(1, 3)
			@Assert.EqualTo(2)
			@Assert.DivisibleBy(2)
			public number = 4;

			@Assert.DateRange(new Date(2020, 0, 1))
			public date = new Date(2020, 1, 1);

			@Assert.Unique
			public array = ["test", "test"];
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.number.lessThanOrEqual",
				"Invalid number value",
				4,
				"expected <= 3"
			)
		);
	});

	test("valid use of comparison parameter decorators", () => {
		class Test {
			@Assert.Range(1, 3)
			@Assert.EqualTo(2)
			@Assert.DivisibleBy(2)
			public number: unknown;

			@Assert.DateRange(new Date(2020, 0, 1))
			public date: unknown;

			@Assert.Unique
			public array: unknown;

			@Assert.ValidateParameters
			public setNumber(
				@Assert.Range(1, 4)
				@Assert.EqualTo(4)
				@Assert.DivisibleBy(2)
				number: unknown
			) {
				this.number = number;
				return this;
			}

			@Assert.ValidateParameters
			public setDate(
				@Assert.DateRange(new Date(2020, 0, 1)) date: unknown
			) {
				this.date = date;
				return this;
			}

			@Assert.ValidateParameters
			public setArray(@Assert.Unique array: unknown) {
				this.array = array;
				return this;
			}
		}

		expect(() => new Test().setNumber(4)).toThrow(
			new ExpectedConstraintError(
				"s.number.lessThanOrEqual",
				"Invalid number value",
				4,
				"expected <= 3"
			)
		);
		expect(() => new Test().setDate(new Date(2020, 1, 1))).toThrow(
			new ExpectedConstraintError(
				"s.date.lessThanOrEqual",
				"Invalid Date value",
				new Date(2020, 1, 1),
				`expected <= ${new Date(2020, 0, 1)}`
			)
		);
		expect(() => new Test().setArray(["test", "test"])).toThrow(
			new ExpectedConstraintError(
				"s.array(T).unique",
				"Array values are not unique",
				["test", "test"],
				"Expected all values to be unique"
			)
		);
	});
});
