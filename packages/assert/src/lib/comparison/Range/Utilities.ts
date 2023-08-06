import type { RangeOptions } from "./RangeOptions";

function isOptionsOfType(options: unknown, type: "number" | "bigint"): boolean {
	if (typeof options === type) {
		return true;
	}
	if (typeof options === "object" && options !== null) {
		return Object.values(options).some((value) => typeof value === type);
	}
	return false;
}

export function isOptionsOfNumberType(
	options: unknown
): options is number | RangeOptions<number> {
	return isOptionsOfType(options, "number");
}

export function isOptionsOfBigIntType(
	options: unknown
): options is bigint | RangeOptions<bigint> {
	return isOptionsOfType(options, "bigint");
}
