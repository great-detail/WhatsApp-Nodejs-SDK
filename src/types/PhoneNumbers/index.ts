/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { BusinessAccountID } from "../BusinessAccount.js";
import { PhoneNumberID } from "../PhoneNumber.js";

export type ListPhoneNumbersOptions = {
  businessAccountID: BusinessAccountID;
  sort?: string;
  filtering?: string;
};

export type ListPhoneNumbersPaylod = {
  data: {
    id: PhoneNumberID;
    verified_name: string;
    code_verification_status: "VERIFIED" | (string & NonNullable<unknown>);
    display_phone_number: string;
    quality_rating: string;
    platform_type: string;
    throughput: {
      level: string;
    };
    last_onboarded_time?: string;
    webhook_configuration: {
      application?: string;
    };
  }[];
};

export type GetPhoneNumberFields = {
  name_status?: boolean;
};

export type GetPhoneNumberOptions<
  Fields extends GetPhoneNumberFields = object,
> = {
  phoneNumberID: PhoneNumberID;
  fields?: Fields;
};

export type GetPhoneNumberPayload<
  Fields extends GetPhoneNumberFields = object,
> = {
  id: PhoneNumberID;
  verified_name: string;
  name_status: Fields extends { name_status: true }
    ?
        | "APPROVED"
        | "AVAILABLE_WITHOUT_REVIEW"
        | "DECLINED"
        | "EXPIRED"
        | "PENDING_REVIEW"
        | "NONE"
        | (string & NonNullable<unknown>)
    : undefined;
  code_verification_status: "VERIFIED" | (string & NonNullable<unknown>);
  display_phone_number: string;
  quality_rating: string;
  platform_type: string;
  throughput: {
    level: string;
  };
  last_onboarded_time?: string;
  webhook_configuration: {
    application?: string;
  };
};
