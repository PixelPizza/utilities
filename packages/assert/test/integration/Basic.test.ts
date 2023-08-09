import Assert from "../../src/index";
import { expect } from "vitest";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Basic decorator tests", () => {
	test("valid use of basic decorators", () => {
		class Test {
			@Assert.IsFalse
			@Assert.Type("boolean")
			public isFalse = false;

			@Assert.IsNull
			public isNull = null;

			@Assert.IsTrue
			public isTrue = true;

			@Assert.IsUndefined
			public isUndefined = undefined;

			@Assert.Instance(Date)
			public date = new Date();
		}

		expect(() => new Test()).not.toThrow();
	});

	test("invalid use of basic decorators", () => {
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
});
