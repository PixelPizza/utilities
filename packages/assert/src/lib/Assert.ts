import { IsNull } from "./basic/IsNull";
import { IsTrue } from "./basic/IsTrue";
import { IsFalse } from "./basic/IsFalse";
import { Email } from "./string/Email";
import { Length } from "./string/Length";

export const Assert = {
	// Basic assertions
	IsNull,
	IsTrue,
	IsFalse,
	// String assertions
	Email,
	Length
};
