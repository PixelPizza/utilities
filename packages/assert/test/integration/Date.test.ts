import Assert from "../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Date decorator tests", () => {
	test("valid use of date decorators", () => {
		class Test {
			@Assert.ValidDate
			public validDate?: Date;

			@Assert.InvalidDate
			public invalidDate?: Date;

			@Assert.ValidateParameters
			public setValidDate(@Assert.ValidDate validDate: Date) {
				this.validDate = validDate;
				return this;
			}

			@Assert.ValidateParameters
			public setInvalidDate(@Assert.InvalidDate invalidDate: Date) {
				this.invalidDate = invalidDate;
				return this;
			}
		}

		expect(() =>
			new Test()
				.setValidDate(new Date())
				.setInvalidDate(new Date("invalid"))
		).not.toThrow();
	});

	test("invalid use of date property decorators", () => {
		class Test {
			@Assert.ValidDate
			public validDate = new Date("invalid");

			@Assert.InvalidDate
			public invalidDate = new Date();
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.date.valid",
				"Invalid Date value",
				new Date("invalid"),
				"expected !== NaN"
			)
		);
	});

	test("valid use of date parameter decorators", () => {
		class Test {
			@Assert.ValidDate
			public validDate: unknown;

			@Assert.InvalidDate
			public invalidDate: unknown;

			@Assert.ValidateParameters
			public setValidDate(@Assert.ValidDate validDate: unknown) {
				this.validDate = validDate;
				return this;
			}

			@Assert.ValidateParameters
			public setInvalidDate(@Assert.InvalidDate invalidDate: unknown) {
				this.invalidDate = invalidDate;
				return this;
			}
		}

		expect(() => new Test().setValidDate(new Date("invalid"))).toThrow(
			new ExpectedConstraintError(
				"s.date.valid",
				"Invalid Date value",
				new Date("invalid"),
				"expected !== NaN"
			)
		);
		expect(() => new Test().setInvalidDate(new Date())).toThrow(
			new ExpectedConstraintError(
				"s.date.invalid",
				"Invalid Date value",
				new Date(),
				"expected === NaN"
			)
		);
	});
});
