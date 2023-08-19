import Assert from "../../../src/index";

describe("Type decorator tests", () => {
	describe("Property decorator", () => {
		test.each<[unknown, Parameters<typeof Assert.Type>[0]]>([
			["", "string"],
			[1, "number"],
			[1n, "bigint"],
			[true, "boolean"],
			[Symbol("a"), "symbol"],
			[undefined, "undefined"],
			[{}, "object"],
			[null, "object"],
			[() => {}, "function"],
			["", { type: "number", assertionEnabled: false }]
		])("GIVEN %o, %s THEN does not throw", (value, options) => {
			class Test {
				@Assert.Type(options)
				public value = value;
			}

			expect(() => new Test()).not.toThrow();
		});

		test.each<[unknown, Parameters<typeof Assert.Type>[0]]>([
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
		])("GIVEN %o, %s THEN throws", (value, options) => {
			class Test {
				@Assert.Type(options)
				public value = value;
			}

			expect(() => new Test()).toThrow();
		});
	});

	describe("Parameter decorator", () => {
		test.each<[unknown, Parameters<typeof Assert.Type>[0]]>([
			["", "string"],
			[1, "number"],
			[1n, "bigint"],
			[true, "boolean"],
			[Symbol("a"), "symbol"],
			[undefined, "undefined"],
			[{}, "object"],
			[null, "object"],
			[() => {}, "function"],
			["", { type: "number", assertionEnabled: false }]
		])("GIVEN %o, %s THEN does not throw", (value, options) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.Type(options) value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(value)).not.toThrow();
		});

		test.each<[unknown, Parameters<typeof Assert.Type>[0]]>([
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
		])("GIVEN %o, %s THEN throws", (value, options) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.Type(options) value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(value)).toThrow();
		});
	});
});
