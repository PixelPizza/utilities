import Assert from "../../src/index";
import {
	CombinedError,
	ExpectedConstraintError,
	ExpectedValidationError,
	ValidationError
} from "@sapphire/shapeshift";

describe("All decorator tests", () => {
	test("valid use of all decorators", () => {
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

			@Assert.Range(1, 5)
			@Assert.DivisibleBy(2)
			@Assert.EqualTo(4)
			@Assert.Finite
			@Assert.Int
			@Assert.SafeInt
			@Assert.Positive
			public positiveSafeFiniteInt?: number;

			@Assert.Negative
			public negativeNumber?: number;

			@Assert.DateRange(new Date(2020, 1, 1))
			@Assert.ValidDate
			public validDate?: Date;

			@Assert.InvalidDate
			@Assert.Instance(Date)
			public invalidDate?: Date;

			@Assert.Unique
			public array?: string[];

			@Assert.Date
			public dateString?: string;

			@Assert.Email
			@Assert.Length(30)
			@Assert.Regex(/^.+@.+\.com$/)
			public emailString?: string;

			@Assert.Ip
			public ipString?: string;

			@Assert.Phone
			public phoneString?: string;

			@Assert.Url
			public urlString?: string;

			@Assert.Uuid
			public uuidString?: string;

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
			public setPositiveSafeFiniteInt(
				@Assert.Range(1, 5)
				@Assert.DivisibleBy(2)
				@Assert.EqualTo(4)
				@Assert.Finite
				@Assert.Int
				@Assert.SafeInt
				@Assert.Positive
				positiveSafeFiniteInt: number
			) {
				this.positiveSafeFiniteInt = positiveSafeFiniteInt;
				return this;
			}

			@Assert.ValidateParameters
			public setNegativeNumber(@Assert.Negative negativeNumber: number) {
				this.negativeNumber = negativeNumber;
				return this;
			}

			@Assert.ValidateParameters
			public setValidDate(
				@Assert.DateRange(new Date(2020, 1, 1))
				@Assert.ValidDate
				validDate: Date
			) {
				this.validDate = validDate;
				return this;
			}

			@Assert.ValidateParameters
			public setInvalidDate(
				@Assert.InvalidDate
				@Assert.Instance(Date)
				invalidDate: Date
			) {
				this.invalidDate = invalidDate;
				return this;
			}

			@Assert.ValidateParameters
			public setArray(@Assert.Unique array: string[]) {
				this.array = array;
				return this;
			}

			@Assert.ValidateParameters
			public setDateString(@Assert.Date dateString: string) {
				this.dateString = dateString;
				return this;
			}

			@Assert.ValidateParameters
			public setEmailString(
				@Assert.Email
				@Assert.Length(30)
				@Assert.Regex(/^.+@.+\.com$/)
				emailString: string
			) {
				this.emailString = emailString;
				return this;
			}

			@Assert.ValidateParameters
			public setIpString(@Assert.Ip ipString: string) {
				this.ipString = ipString;
				return this;
			}

			@Assert.ValidateParameters
			public setPhoneString(@Assert.Phone phoneString: string) {
				this.phoneString = phoneString;
				return this;
			}

			@Assert.ValidateParameters
			public setUrlString(@Assert.Url urlString: string) {
				this.urlString = urlString;
				return this;
			}

			@Assert.ValidateParameters
			public setUuidString(@Assert.Uuid uuidString: string) {
				this.uuidString = uuidString;
				return this;
			}
		}

		expect(() =>
			new Test()
				.setIsFalse(false)
				.setIsNull(null)
				.setIsTrue(true)
				.setIsUndefined(undefined)
				.setPositiveSafeFiniteInt(4)
				.setNegativeNumber(-1)
				.setValidDate(new Date(2020, 1, 1))
				.setInvalidDate(new Date("invalid"))
				.setArray(["test", "test1"])
				.setDateString("2020-01-01T00:00:00.000Z")
				.setEmailString("email@example.com")
				.setIpString("0.0.0.0")
				.setPhoneString("+31643434343")
				.setUrlString("https://example.com")
				.setUuidString("ae1a26c4-c813-459d-9095-4ddf908ab514")
		).not.toThrow();
	});

	test("invalid use of all property decorators", () => {
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

			@Assert.Range(1, 5)
			@Assert.DivisibleBy(2)
			@Assert.EqualTo(4)
			@Assert.Finite
			@Assert.Int
			@Assert.SafeInt
			@Assert.Positive
			public positiveSafeFiniteInt = NaN;

			@Assert.Negative
			public negativeNumber = 1;

			@Assert.DateRange(new Date(2020, 1, 1))
			@Assert.ValidDate
			public validDate = new Date("invalid");

			@Assert.InvalidDate
			public invalidDate = new Date(2020, 1, 1);

			@Assert.Unique
			public array = ["test", "test"];

			@Assert.Date
			@Assert.Instance(Number)
			public dateString = "notadate";

			@Assert.Email
			@Assert.Length(30)
			@Assert.Regex(/^.+@.+\.com$/)
			public emailString = "thisisaverylongnotemail";

			@Assert.Ip
			public ipString = "0.0.0";

			@Assert.Phone
			public phoneString = "+3164343434";

			@Assert.Url
			public urlString = "example";

			@Assert.Uuid
			public uuidString = "ae1a26c4-c813-459d-9095-4ddf908ab51";
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

	test("invalid use of all parameter decorators", () => {
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

			@Assert.Range(1, 5)
			@Assert.DivisibleBy(2)
			@Assert.EqualTo(4)
			@Assert.Finite
			@Assert.Int
			@Assert.SafeInt
			@Assert.Positive
			public positiveSafeFiniteInt: unknown;

			@Assert.Negative
			public negativeNumber: unknown;

			@Assert.DateRange(new Date(2020, 1, 1))
			@Assert.ValidDate
			public validDate: unknown;

			@Assert.InvalidDate
			@Assert.Instance(Date)
			public invalidDate: unknown;

			@Assert.Unique
			public array: unknown;

			@Assert.Date
			public dateString: unknown;

			@Assert.Email
			@Assert.Length(30)
			@Assert.Regex(/^.+@.+\.com$/)
			public emailString: unknown;

			@Assert.Ip
			public ipString: unknown;

			@Assert.Phone
			public phoneString: unknown;

			@Assert.Url
			public urlString: unknown;

			@Assert.Uuid
			public uuidString: unknown;

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
			public setPositiveSafeFiniteInt(
				@Assert.Range(1, 5)
				@Assert.DivisibleBy(2)
				@Assert.EqualTo(4)
				@Assert.Finite
				@Assert.Int
				@Assert.SafeInt
				@Assert.Positive
				positiveSafeFiniteInt: unknown
			) {
				this.positiveSafeFiniteInt = positiveSafeFiniteInt;
				return this;
			}

			@Assert.ValidateParameters
			public setNegativeNumber(@Assert.Negative negativeNumber: unknown) {
				this.negativeNumber = negativeNumber;
				return this;
			}

			@Assert.ValidateParameters
			public setValidDate(
				@Assert.DateRange(new Date(2020, 1, 1))
				@Assert.ValidDate
				validDate: unknown
			) {
				this.validDate = validDate;
				return this;
			}

			@Assert.ValidateParameters
			public setInvalidDate(
				@Assert.InvalidDate
				@Assert.Instance(Date)
				invalidDate: unknown
			) {
				this.invalidDate = invalidDate;
				return this;
			}

			@Assert.ValidateParameters
			public setArray(@Assert.Unique array: unknown) {
				this.array = array;
				return this;
			}

			@Assert.ValidateParameters
			public setDateString(@Assert.Date dateString: unknown) {
				this.dateString = dateString;
				return this;
			}

			@Assert.ValidateParameters
			public setEmailString(
				@Assert.Email
				@Assert.Length(30)
				@Assert.Regex(/^.+@.+\.com$/)
				emailString: unknown
			) {
				this.emailString = emailString;
				return this;
			}

			@Assert.ValidateParameters
			public setIpString(@Assert.Ip ipString: unknown) {
				this.ipString = ipString;
				return this;
			}

			@Assert.ValidateParameters
			public setPhoneString(@Assert.Phone phoneString: unknown) {
				this.phoneString = phoneString;
				return this;
			}

			@Assert.ValidateParameters
			public setUrlString(@Assert.Url urlString: unknown) {
				this.urlString = urlString;
				return this;
			}

			@Assert.ValidateParameters
			public setUuidString(@Assert.Uuid uuidString: unknown) {
				this.uuidString = uuidString;
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
		expect(() => new Test().setPositiveSafeFiniteInt(NaN)).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.greaterThanOrEqual",
					"Invalid number value",
					NaN,
					"expected >= 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					NaN
				)
			])
		);
		expect(() => new Test().setNegativeNumber(1)).toThrow(
			new CombinedError([
				new ExpectedConstraintError(
					"s.number.lessThan",
					"Invalid number value",
					1,
					"expected < 0"
				),
				new ValidationError(
					"s.bigint",
					"Expected a bigint primitive",
					1
				)
			])
		);
		expect(() => new Test().setValidDate(new Date("invalid"))).toThrow(
			new ExpectedConstraintError(
				"s.date.valid",
				"Invalid Date value",
				new Date("invalid"),
				"expected !== NaN"
			)
		);
		expect(() => new Test().setInvalidDate(new Date(2020, 1, 1))).toThrow(
			new ExpectedConstraintError(
				"s.date.invalid",
				"Invalid Date value",
				new Date(2020, 1, 1),
				"expected === NaN"
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
		expect(() => new Test().setDateString("notadate")).toThrow(
			new ExpectedConstraintError(
				"s.string.date",
				"Invalid date string",
				"notadate",
				"expected to be a valid date string (in the ISO 8601 or ECMA-262 format)"
			)
		);
		expect(() =>
			new Test().setEmailString("thisisaverylongnotemail")
		).toThrow(
			new ExpectedConstraintError(
				"s.string.regex",
				"Invalid string format",
				"thisisaverylongnotemail",
				"expected /^.+@.+\\.com$/.test(expected) to be true"
			)
		);
		expect(() => new Test().setIpString("0.0.0")).toThrow(
			new ExpectedConstraintError(
				"s.string.ip",
				"Invalid IP address",
				"0.0.0",
				"expected to be an IP address"
			)
		);
		expect(() => new Test().setPhoneString("+3164343434")).toThrow(
			new ExpectedConstraintError(
				"s.string.phone",
				"Invalid phone number",
				"+3164343434",
				"expected to be a phone number"
			)
		);
		expect(() => new Test().setUrlString("example")).toThrow(
			new ExpectedConstraintError(
				"s.string.url",
				"Invalid URL",
				"example",
				"expected to match a URL"
			)
		);
		expect(() =>
			new Test().setUuidString("ae1a26c4-c813-459d-9095-4ddf908ab51")
		).toThrow(
			new ExpectedConstraintError(
				"s.string.uuid",
				"Invalid string format",
				"ae1a26c4-c813-459d-9095-4ddf908ab51",
				"expected to match UUIDv4"
			)
		);
	});
});
