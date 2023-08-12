import {
	getGlobalAssertionEnabled,
	setGlobalAssertionEnabled
} from "../../src";

describe("configs tests", () => {
	describe("assertionEnabled tests", () => {
		afterAll(() => {
			setGlobalAssertionEnabled(true);
		});

		test.each([
			[true, true],
			[false, false]
		])(
			"GIVEN assertionEnabled is %s THEN get returns %s",
			(value, expected) => {
				setGlobalAssertionEnabled(value);

				expect(getGlobalAssertionEnabled()).toBe(expected);
			}
		);
	});
});
