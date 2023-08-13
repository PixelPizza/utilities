import Assert, { setGlobalAssertionEnabled } from "../../src";

describe("Configs tests", () => {
	describe("global assertion enabled", () => {
		afterEach(() => {
			setGlobalAssertionEnabled(true);
		});

		test("GIVEN invalid value with global assertion disabled THEN does not throw", () => {
			setGlobalAssertionEnabled(false);

			class Test {
				@Assert.Type("string")
				public value = 1;
			}

			expect(() => new Test()).not.toThrow();
		});

		test("WHEN disabling global assertion in constructor THEN does not throw", () => {
			class Test {
				@Assert.Type("number")
				public value: number | string = 1;

				public constructor() {
					setGlobalAssertionEnabled(false);
					this.value = "";
				}
			}

			expect(() => new Test()).not.toThrow();
		});
	});
});
