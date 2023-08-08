import Assert from "../../src";
import { expect } from "vitest";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Basic decorator tests", () => {
	test("valid use of basic decorators", () => {
		class Test {
			@Assert.IsFalse
			public isFalse = false;

			@Assert.IsNull
			public isNull = null;

			@Assert.IsTrue
			public isTrue = true;

			@Assert.IsUndefined
			public isUndefined = undefined;
		}

		expect(() => new Test()).not.toThrow();
	});

	test("invalid use of basic decorators", () => {
		class Test {
			@Assert.IsFalse
			public isFalse = true;

			@Assert.IsNull
			public isNull = undefined;

			@Assert.IsTrue
			public isTrue = false;

			@Assert.IsUndefined
			public isUndefined = null;
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
