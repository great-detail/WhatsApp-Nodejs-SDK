/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { PhoneNumberID } from "../PhoneNumber.js";

export type BusinessProfileFields =
  | "id"
  | "messaging_product"
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

  /** Business address. Maximum 256 characters. */
  address?: string;
  description?: string;

  /** Business email address. Must be in valid email format. Maximum 128 characters. */
  email?: string;
  messaging_product: "whatsapp";
  profile_picture_url?: string;

  /** Business category. These values map to the following strings, which are displayed in the business profile in the WhatsApp client. */
  vertical: BusinessProfileVertical;

  /** URLs associated with the business, such as a website, Facebook Page, or Instagram profile. */
  websites?: [string] | [string, string] | (string[] & NonNullable<unknown>);
};

export type GetBusinessProfileFields =
  | Partial<Record<BusinessProfileFields, boolean>>
  | BusinessProfileFields[];

export type GetBusinessProfileOptions = {
  phoneNumberID: PhoneNumberID;
  fields?: GetBusinessProfileFields;
};

export type GetBusinessProfilePayload = {
  data: [BusinessProfile];
};

export type UpdateBusinessProfileOptions = {
  phoneNumberID: PhoneNumberID;
  about?: string;

  /** Business address. Maximum 256 characters. */
  address?: string;
  description?: string;

  /** Business email address. Must be in valid email format. Maximum 128 characters. */
  email?: string;
  profile_picture_handle?: string;

  /** Business category. These values map to the following strings, which are displayed in the business profile in the WhatsApp client. */
  vertical?: BusinessProfileVertical;

  /** URLs associated with the business, such as a website, Facebook Page, or Instagram profile. */
  websites?: [string] | [string, string] | (string[] & NonNullable<unknown>);
};

export type UpdateBusinessProfilePayload = {
  success: boolean;
};
