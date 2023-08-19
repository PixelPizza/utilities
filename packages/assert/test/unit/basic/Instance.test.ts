import Assert from "../../../src/index";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("Instance decorator tests", () => {
	describe("Property decorator", () => {
		test.each<[unknown, Parameters<typeof Assert.Instance>[0]]>([
			[new Date(), Date],
			[new String(""), String],
			[new Number(1), Number],
			[new String(""), { expected: Date, assertionEnabled: false }]
		])("GIVEN %s with options %s THEN does not throw", (value, options) => {
			class Test {
				@Assert.Instance(options)
				public value = value;
			}

			expect(() => new Test()).not.toThrow();
		});

		test.each<[unknown, Parameters<typeof Assert.Instance>[0]]>([
			[new Date(), String],
			["", String],
			[1, Number]
		])("GIVEN %s instanceof %s THEN throws", (value, constructor) => {
			class Test {
				@Assert.Instance(constructor)
				public value = value;
			}

			expect(() => new Test()).toThrow(
				new ExpectedValidationError(
					"s.instance(V)",
					"Expected",
					constructor,
					value
				)
			);
		});
	});

	describe("Parameter decorator", () => {
		test.each<[unknown, Parameters<typeof Assert.Instance>[0]]>([
			[new Date(), Date],
			[new String(""), String],
			[new Number(1), Number],
			[new String(""), { expected: Date, assertionEnabled: false }]
		])("GIVEN %s with options %s THEN does not throw", (value, options) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.Instance(options) value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(value)).not.toThrow();
		});

		test.each<[unknown, Parameters<typeof Assert.Instance>[0]]>([
			[new Date(), String],
			["", String],
			[1, Number]
		])("GIVEN %s instanceof %s THEN throws", (value, constructor) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.Instance(constructor) value: unknown) {
					return value;
				}
			}

			expect(() => new Test().testFunc(value)).toThrow(
				new ExpectedValidationError(
					"s.instance(V)",
					"Expected",
					constructor,
					value
				)
			);
		});
	});
});
