import { IsNull } from "./basic/IsNull";
import { IsTrue } from "./basic/IsTrue";
import { IsFalse } from "./basic/IsFalse";
import { IsUndefined } from "./basic/IsUndefined";
import { Email } from "./string/Email";
import { Length } from "./string/Length";
import { Url } from "./string/Url";
import { Regex } from "./string/Regex";
import { Ip } from "./string/Ip";
import { Uuid } from "./string/Uuid";
import { Date } from "./string/Date";
import { Phone } from "./string/Phone";
import { EqualTo } from "./comparison/EqualTo";
import { Range } from "./comparison/Range";
import { DivisibleBy } from "./comparison/DivisibleBy";
import { Unique } from "./comparison/Unique";
import { Positive } from "./number/Positive";
import { Negative } from "./number/Negative";
import { SafeInt } from "./number/SafeInt";
import { Finite } from "./number/Finite";
import { Int } from "./number/Int";

export const Assert = {
	// Basic assertions
	IsNull,
	IsTrue,
	IsFalse,
	IsUndefined,
	// String assertions
	Email,
	Length,
	Url,
	Regex,
	Ip,
	Uuid,
	Date,
	Phone,
	// Comparison assertions
	EqualTo,
	Range,
	DivisibleBy,
	Unique,
	// Number assertions
	Positive,
	Negative,
	SafeInt,
	Finite,
	Int
};
