import Assert from "../../../src/index";

describe("Instance tests", () => {
	test.each<
		[
			unknown,
			(
				| "string"
				| "number"
				| "bigint"
				| "boolean"
				| "symbol"
				| "undefined"
				| "object"
				| "function"
			)
		]
	>([
		["", "string"],
		[1, "number"],
		[1n, "bigint"],
		[true, "boolean"],
		[Symbol("a"), "symbol"],
		[undefined, "undefined"],
		[{}, "object"],
		[null, "object"],
		[() => {}, "function"]
	])("GIVEN %o, %s THEN does not throw", (value, type) => {
		class Test {
			@Assert.Type(type)
			public value = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each<
		[
			unknown,
			(
				| "string"
				| "number"
				| "bigint"
				| "boolean"
				| "symbol"
				| "undefined"
				| "object"
				| "function"
			)
		]
	>([
		["", "object"],
		["", "number"],
		["", "boolean"],
		[1, "boolean"],
		[1n, "number"],
		[true, "object"],
		[Symbol("a"), "function"],
		[undefined, "object"],
		[{}, "undefined"],
		[null, "number"],
		[() => {}, "string"]
	])("GIVEN %o, %s THEN throws", (value, type) => {
		class Test {
			@Assert.Type(type)
			public value = value;
		}

		expect(() => new Test()).toThrow();
	});
});
