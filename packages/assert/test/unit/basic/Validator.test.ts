import Assert from "../../../src/index";
import { s } from "@sapphire/shapeshift";

describe("Validator decorator tests", () => {
	const Enum = {
		A: "a",
		B: "b"
	} as const;

	describe("Property decorator", () => {
		test.each<[unknown, Parameters<typeof Assert.Validator>[0]]>([
			[["a", "b"], s.array(s.string)],
			["b", s.enum("a", "b", "c")],
			[Enum.A, s.nativeEnum(Enum)],
			[1, { validator: s.number, assertionEnabled: false }]
		])("GIVEN %o with %o THEN does not throw", (value, options) => {
			class Test {
				@Assert.Validator(options)
				public value = value;
			}

			expect(() => new Test()).not.toThrow();
		});

		test.each<[unknown, Parameters<typeof Assert.Validator>[0]]>([
			[["a", 1], s.array(s.string)],
			["d", s.enum("a", "b", "c")],
			["c", s.nativeEnum(Enum)]
		])("GIVEN %o with %o THEN throws", (value, validator) => {
			class Test {
				@Assert.Validator(validator)
				public value = value;
			}

			expect(() => new Test()).toThrow();
		});
	});

	describe("Parameter decorator", () => {
		test.each<[unknown, Parameters<typeof Assert.Validator>[0]]>([
			[["a", "b"], s.array(s.string)],
			["b", s.enum("a", "b", "c")],
			[Enum.A, s.nativeEnum(Enum)],
			[1, { validator: s.number, assertionEnabled: false }]
		])("GIVEN %o with %o THEN does not throw", (value, options) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.Validator(options) value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(value)).not.toThrow();
		});

		test.each<[unknown, Parameters<typeof Assert.Validator>[0]]>([
			[["a", 1], s.array(s.string)],
			["d", s.enum("a", "b", "c")],
			["c", s.nativeEnum(Enum)]
		])("GIVEN %o with %o THEN throws", (value, validator) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.Validator(validator) value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(value)).toThrow();
		});
	});
});
