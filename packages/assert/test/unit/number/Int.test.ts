import { Assert } from "../../../src/index";
import { ExpectedConstraintError } from "@sapphire/shapeshift";

describe("Int tests", () => {
	describe("Property decorator", () => {
		test.each<number>([-312123, -10, -1, 0, 1, 10, 312123])(
			"GIVEN %i THEN does not throw",
			(value) => {
				class Test {
					@Assert.Int
					public number = value;
				}

				expect(() => new Test()).not.toThrow();
			}
		);

		test("GIVEN float with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.Int({ assertionEnabled: false })
				public number = 1.7;
			}

			expect(() => new Test()).not.toThrow();
		});

		test.each<number>([
			-23443.433424, -10.3, -1.7, 1.7, 10.3, 23443.433424
		])("GIVEN %f THEN throws", (value) => {
			class Test {
				@Assert.Int
				public number = value;
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.number.int",
					"Given value is not an integer",
					value,
					"Number.isInteger(expected) to be true"
				)
			);
		});
	});

	describe("Parameter decorator", () => {
		test.each<number>([-312123, -10, -1, 0, 1, 10, 312123])(
			"GIVEN %i THEN does not throw",
			(value) => {
				class Test {
					@Assert.ValidateParameters
					public testFunc(@Assert.Int number: number) {
						return number;
					}
				}

				expect(() => new Test().testFunc(value)).not.toThrow();
			}
		);

		test("GIVEN float with assertion disabled THEN does not throw", () => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(
					@Assert.Int({ assertionEnabled: false }) number: number
				) {
					return number;
				}
			}

			expect(() => new Test().testFunc(1.7)).not.toThrow();
		});

		test.each<number>([
			-23443.433424, -10.3, -1.7, 1.7, 10.3, 23443.433424
		])("GIVEN %f THEN throws", (value) => {
			class Test {
				@Assert.ValidateParameters
				public testFunc(@Assert.Int number: number) {
					return number;
				}
			}

			expect(() => new Test().testFunc(value)).toThrow(
				new ExpectedConstraintError(
					"s.number.int",
					"Given value is not an integer",
					value,
					"Number.isInteger(expected) to be true"
				)
			);
		});
	});
});
