import Assert from "../../../src/index";
import { s } from "@sapphire/shapeshift";

describe("Validator decorator tests", () => {
	const Enum = {
		A: "a",
		B: "b"
	} as const;

	test.each([
		[["a", "b"], s.array(s.string)],
		["b", s.enum("a", "b", "c")],
		[Enum.A, s.nativeEnum(Enum)]
	])("GIVEN %o with %o THEN does not throw", (value, validator) => {
		class Test {
			@Assert.Validator(validator)
			public value = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each([
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
