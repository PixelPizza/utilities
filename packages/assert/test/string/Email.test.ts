import { Assert } from "../../src";

describe("Email tests", () => {
	test("GIVEN valid email THEN does not throw", () => {
		class Test {
			@Assert.Email
			public email: string;

			public constructor() {
				this.email = "email@example.com";
			}
		}

		expect(() => new Test()).not.toThrow();
	});
});
