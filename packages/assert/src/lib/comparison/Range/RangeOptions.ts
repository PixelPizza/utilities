export interface RangeOptions<T extends number | bigint = number | bigint> {
	min?: T;
	max?: T;
	equal?: T;
	notEqual?: T;
	greaterThan?: T;
	lessThan?: T;
}

export function createOptions(
	options: number | bigint | RangeOptions,
	max?: number | bigint
) {
	if (typeof options !== "object") {
		return max ? { min: options, max } : { max: options };
	}
	return options;
}
