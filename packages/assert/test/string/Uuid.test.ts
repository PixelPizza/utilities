import Assert from "../../src";
import {
	ExpectedConstraintError,
	type StringUuidOptions
} from "@sapphire/shapeshift";

describe("Uuid tests", () => {
	describe("no arguments", () => {
		test("GIVEN valid UUIDv4 THEN does not throw", () => {
			class Test {
				@Assert.Uuid
				public uuid = "ae1a26c4-c813-459d-9095-4ddf908ab514";
			}

			try {
				new Test();
			} catch (e) {
				console.log(e);
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN invalid UUIDv4 THEN throws", () => {
			class Test {
				@Assert.Uuid
				public uuid = "ae1a26c4-c813-459d-9095-4ddf908ab51";
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.uuid",
					"Invalid string format",
					"ae1a26c4-c813-459d-9095-4ddf908ab51",
					"expected to be UUID"
				)
			);
		});
	});

	describe("versions 1, 3, 4 and 5", () => {
		const validUuids: {
			version: StringUuidOptions["version"];
			uuid: string;
		}[] = [
			{ version: 1, uuid: "c6ffd1b6-2ec9-11ee-be56-0242ac120002" },
			{ version: 3, uuid: "a472298e-a2e0-3396-898f-eecbbb9872c4" },
			{ version: 4, uuid: "ae1a26c4-c813-459d-9095-4ddf908ab514" },
			{ version: 5, uuid: "3e91af1e-f7e6-54cd-808f-1448ac9cb7ff" }
		];
		const invalidUuids: {
			version: StringUuidOptions["version"];
			uuid: string;
			expected: string;
		}[] = [
			{
				version: 1,
				uuid: "c6ffd1b6-2ec9-11ee-be56-0242ac12000",
				expected: "expected to be UUIDv1"
			},
			{
				version: 3,
				uuid: "a472298e-a2e0-3396-898f-eecbbb9872c",
				expected: "expected to be UUIDv3"
			},
			{
				version: 4,
				uuid: "ae1a26c4-c813-459d-9095-4ddf908ab51",
				expected: "expected to be UUIDv4"
			},
			{
				version: 5,
				uuid: "3e91af1e-f7e6-54cd-808f-1448ac9cb7f",
				expected: "expected to be UUIDv5"
			}
		];

		test.each(validUuids)(
			"GIVEN valid UUID version $version THEN does not throw",
			({ version, uuid }) => {
				class Test {
					@Assert.Uuid({ version })
					public uuid = uuid;
				}

				try {
					new Test();
				} catch (e) {
					console.log(e);
				}

				expect(() => new Test()).not.toThrow();
			}
		);

		test.each(invalidUuids)(
			"GIVEN invalid UUID version $version THEN throws",
			({ version, uuid, expected }) => {
				class Test {
					@Assert.Uuid({ version })
					public uuid = uuid;
				}

				expect(() => new Test()).toThrow(
					new ExpectedConstraintError(
						`s.string.uuid`,
						"Invalid string format",
						uuid,
						expected
					)
				);
			}
		);
	});

	describe("nullable", () => {
		test("GIVEN 00000000-0000-0000-0000-000000000000 and nullable THEN does not throw", () => {
			class Test {
				@Assert.Uuid({ nullable: true })
				public uuid = "00000000-0000-0000-0000-000000000000";
			}

			expect(() => new Test()).not.toThrow();
		});

		test("GIVEN 00000000-0000-0000-0000-000000000000 and not nullable THEN throws", () => {
			class Test {
				@Assert.Uuid({ nullable: false })
				public uuid = "00000000-0000-0000-0000-000000000000";
			}

			expect(() => new Test()).toThrow(
				new ExpectedConstraintError(
					"s.string.uuid",
					"Invalid string format",
					"00000000-0000-0000-0000-000000000000",
					"expected to be UUID"
				)
			);
		});
	});
});
