import Assert from "../../../src/index";
import { ExpectedValidationError } from "@sapphire/shapeshift";

describe("Instance decorator tests", () => {
	test.each([
		[new Date(), Date],
		[new String(""), String],
		[new Number(1), Number]
	])("GIVEN %s instanceof %s THEN does not throw", (value, constructor) => {
		class Test {
			@Assert.Instance(constructor)
			public value = value;
		}

		expect(() => new Test()).not.toThrow();
	});

	test.each([
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
