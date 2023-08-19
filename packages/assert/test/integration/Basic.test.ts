import Assert from "../../src/index";
import { expect } from "vitest";
import {
	ExpectedConstraintError,
	ExpectedValidationError
} from "@sapphire/shapeshift";

describe("Basic decorator tests", () => {
	test("valid use of basic decorators", () => {
		class Test {
			@Assert.IsFalse
			@Assert.Type("boolean")
			public isFalse?: false;

			@Assert.IsNull
			public isNull?: null;

			@Assert.IsTrue
			public isTrue?: true;

			@Assert.IsUndefined
			public isUndefined: undefined;

			@Assert.Instance(Date)
			public date?: Date;

			@Assert.ValidateParameters
			public setIsFalse(
				@Assert.IsFalse @Assert.Type("boolean") isFalse: false
			) {
				this.isFalse = isFalse;
				return this;
			}

			@Assert.ValidateParameters
			public setIsNull(@Assert.IsNull isNull: null) {
				this.isNull = isNull;
				return this;
			}

			@Assert.ValidateParameters
			public setIsTrue(@Assert.IsTrue isTrue: true) {
				this.isTrue = isTrue;
				return this;
			}

			@Assert.ValidateParameters
			public setIsUndefined(@Assert.IsUndefined isUndefined: undefined) {
				this.isUndefined = isUndefined;
				return this;
			}

			@Assert.ValidateParameters
			public setDate(@Assert.Instance(Date) date: Date) {
				this.date = date;
				return this;
			}
		}

		expect(() =>
			new Test()
				.setIsFalse(false)
				.setIsNull(null)
				.setIsTrue(true)
				.setIsUndefined(undefined)
				.setDate(new Date())
		).not.toThrow();
	});

	test("invalid use of basic property decorators", () => {
		class Test {
			@Assert.IsFalse
			@Assert.Type("string")
			public isFalse = true;

			@Assert.IsNull
			public isNull = undefined;

			@Assert.IsTrue
			public isTrue = false;

			@Assert.IsUndefined
			public isUndefined = null;

			@Assert.Instance(Number)
			public date = new Date();
		}

		expect(() => new Test()).toThrow(
			new ExpectedConstraintError(
				"s.boolean.false",
				"Invalid boolean value",
				true,
				"false"
			)
		);
	});

	test("invalid use of basic parameter decorators", () => {
		class Test {
			@Assert.IsFalse
			@Assert.Type("boolean")
			public isFalse: unknown;

			@Assert.IsNull
			public isNull: unknown;

			@Assert.IsTrue
			public isTrue: unknown;

			@Assert.IsUndefined
			public isUndefined: unknown;

			@Assert.Instance(Date)
			public date: unknown;

			@Assert.ValidateParameters
			public setIsFalse(
				@Assert.IsFalse @Assert.Type("boolean") isFalse: unknown
			) {
				this.isFalse = isFalse;
				return this;
			}

			@Assert.ValidateParameters
			public setIsNull(@Assert.IsNull isNull: unknown) {
				this.isNull = isNull;
				return this;
			}

			@Assert.ValidateParameters
			public setIsTrue(@Assert.IsTrue isTrue: unknown) {
				this.isTrue = isTrue;
				return this;
			}

			@Assert.ValidateParameters
			public setIsUndefined(@Assert.IsUndefined isUndefined: unknown) {
				this.isUndefined = isUndefined;
				return this;
			}

			@Assert.ValidateParameters
			public setDate(@Assert.Instance(Date) date: unknown) {
				this.date = date;
				return this;
			}
		}

		expect(() => new Test().setIsFalse(true)).toThrow(
			new ExpectedConstraintError(
				"s.boolean.false",
				"Invalid boolean value",
				true,
				"false"
			)
		);
		expect(() => new Test().setIsNull(undefined)).toThrow(
			new ExpectedValidationError(
				"s.literal(V)",
				"Expected values to be equals",
				undefined,
				"null"
			)
		);
		expect(() => new Test().setIsTrue(false)).toThrow(
			new ExpectedConstraintError(
				"s.boolean.true",
				"Invalid boolean value",
				false,
				"true"
			)
		);
		expect(() => new Test().setIsUndefined(null)).toThrow(
			new ExpectedValidationError(
				"s.literal(V)",
				"Expected values to be equals",
				null,
				"undefined"
			)
		);
		const clickEvent = new Event("click");
		expect(() => new Test().setDate(clickEvent)).toThrow(
			new ExpectedValidationError(
				"s.instance(V)",
				"Expected",
				clickEvent,
				Date
			)
		);
	});
});
