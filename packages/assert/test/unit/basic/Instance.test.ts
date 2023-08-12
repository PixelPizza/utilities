import Assert from "../../../src/index";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("Instance decorator tests", () => {
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
