/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { PhoneNumberID } from "../PhoneNumber.js"

export type GetBusinessProfileFields = {
  about?: boolean;
  address?: boolean;
  description?: boolean;
  email?: boolean;
  profile_picture_url?: boolean;
  websites?: boolean;
  vertical?: boolean;
};

export type GetBusinessProfileOptions<Fields extends GetBusinessProfileFields = {}> = {
  phoneNumberID: PhoneNumberID;
  fields?: Fields;
}

export type GetBusinessProfilePayload<Fields extends GetBusinessProfileFields = {}> = {
  data: [{
    about: Fields extends { about: true } ? string : undefined;
    address: Fields extends { address: true } ? string : undefined;
    description: Fields extends { description: true } ? string : undefined;
    email: Fields extends { email: true } ? string : undefined;
    messaging_product: "whatsapp";
    profile_picture_url: Fields extends { profile_picture_url: true } ? string : undefined;
    vertical: Fields extends { vertical: true }
      ? ("" | (string & NonNullable<unknown>))
      : undefined;
    websites: Fields extends { websites: true } ? ([string] | [string, string] | (string[] & NonNullable<unknown>)) : undefined;
  }];
};

export type UpdateBusinessProfileOptions = {
  phoneNumberID: PhoneNumberID;
  about?: string;
  address?: string;
  description?: string;
  email?: string;
  profile_picture_handle?: string;
  vertical?: ("" | (string & NonNullable<unknown>));
  websites?: [string] | [string, string] | (string[] & NonNullable<unknown>);
}

export type UpdateBusinessProfilePayload = {
  success: boolean;
}
