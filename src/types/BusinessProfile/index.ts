/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { PhoneNumberID } from "../PhoneNumber.js";

export type BusinessProfileFields =
  | "about"
  | "address"
  | "description"
  | "email"
  | "profile_picture_url"
  | "websites"
  | "vertical";

export const BUSINESS_PROFILE_VERTICALS = [
  "UNDEFINED",
  "AUTO",
  "BEAUTY",
  "APPAREL",
  "EDU",
  "ENTERTAIN",
  "EVENT_PLAN",
  "FINANCE",
  "GROCERY",
  "ONLINE_GAMBLING",
  "PHYSICAL_GAMBLING",
  "OTC_DRUGS",
  "ALCOHOL",
  "GOVT",
  "HOTEL",
  "HEALTH",
  "NONPROFIT",
  "PROF_SERVICES",
  "RETAIL",
  "TRAVEL",
  "RESTAURANT",
  "NOT_A_BIZ",
  "OTHER",
] as const;
export type BusinessProfileVertical =
  (typeof BUSINESS_PROFILE_VERTICALS)[number];

export type BusinessProfile = {
  about?: string;
  address?: string;
  description?: string;
  email?: string;
  messaging_product: "whatsapp";
  profile_picture_url?: string;
  vertical: BusinessProfileVertical;
  websites?: [string] | [string, string] | (string[] & NonNullable<unknown>);
};

export type GetBusinessProfileFields = Partial<
  Record<BusinessProfileFields, boolean>
>;

export type GetBusinessProfileOptions<
  Fields extends GetBusinessProfileFields = object,
> = {
  phoneNumberID: PhoneNumberID;
  fields?: Fields;
};

export type GetBusinessProfilePayload = {
  data: [BusinessProfile];
};

export type UpdateBusinessProfileOptions = {
  phoneNumberID: PhoneNumberID;
  about?: string;
  address?: string;
  description?: string;
  email?: string;
  profile_picture_handle?: string;
  vertical?: "" | (string & NonNullable<unknown>);
  websites?: [string] | [string, string] | (string[] & NonNullable<unknown>);
};

export type UpdateBusinessProfilePayload = {
  success: boolean;
};
