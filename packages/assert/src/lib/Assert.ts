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
	Phone
};
