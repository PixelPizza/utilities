import Assert from "../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("All decorator tests", () => {
	test("valid use of all decorators", () => {
		class Test {
			@Assert.IsFalse
			public isFalse = false;

			@Assert.IsNull
			public isNull = null;

			@Assert.IsTrue
			public isTrue = true;

			@Assert.IsUndefined
			public isUndefined = undefined;

			@Assert.Range(1, 5)
			@Assert.DivisibleBy(2)
			@Assert.EqualTo(4)
			@Assert.Finite
			@Assert.Int
			@Assert.SafeInt
			@Assert.Positive
			public positiveSafeFiniteInt = 4;

			@Assert.Negative
			public negativeNumber = -1;

			@Assert.DateRange(new Date(2020, 1, 1))
			@Assert.ValidDate
			public validDate = new Date(2020, 1, 1);

			@Assert.InvalidDate
			public invalidDate = new Date("invalid");

			@Assert.Unique
			public array = ["test", "test1"];

			@Assert.Date
			public dateString = "2020-01-01T00:00:00.000Z";

			@Assert.Email
			@Assert.Length(30)
			@Assert.Regex(/^.+@.+\.com$/)
			public emailString = "email@example.com";

			@Assert.Ip
			public ipString = "0.0.0.0";

			@Assert.Phone
			public phoneString = "+31643434343";

			@Assert.Url
			public urlString = "https://example.com";

			@Assert.Uuid
			public uuidString = "ae1a26c4-c813-459d-9095-4ddf908ab514";
		}

		expect(() => new Test()).not.toThrow();
	});

	test("invalid use of all decorators", () => {
		class Test {
			@Assert.IsFalse
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
});
