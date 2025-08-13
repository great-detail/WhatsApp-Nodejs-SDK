/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { BusinessAccountID } from "../BusinessAccount/index.js";
import {
  BusinessProfile,
  BusinessProfileFields,
} from "../BusinessProfile/index.js";
import { PhoneNumberID } from "../PhoneNumber.js";

export type PhoneNumberFields =
  | "id"
  | "account_mode"
  | "code_verification_status"
  | "conversational_automation"
  | "display_phone_number"
  | "quality_rating"
  | "verified_name"
  | "name_status"
  | "eligibility_for_api_business_global_search"
  | "health_status"
  | "is_official_business_account"
  | "is_on_biz_app"
  | "is_pin_enabled"
  | "is_preverified_number"
  | "last_onboarded_time"
  | "messaging_limit_tier"
  | "platform_type"
  | "quality_score"
  | "status"
  | "throughput"
  | "webhook_configuration"
  | ["whatsapp_business_profile", BusinessProfileFields[]];

export const PHONE_NUMBER_STATUS = [
  "PENDING",
  "DELETED",
  "MIGRATED",
  "BANNED",
  "RESTRICTED",
  "RATE_LIMITED",
  "FLAGGED",
  "CONNECTED",
  "DISCONNECTED",
  "UNKNOWN",
  "UNVERIFIED",
] as const;
export type PhoneNumberStatus = (typeof PHONE_NUMBER_STATUS)[number];

export const PHONE_NUMBER_CODE_VERIFICATION_STATUS = [
  "VERIFIED",
  "NOT_VERIFIED",
  "EXPIRED",
] as const;
export type PhoneNumberCodeVerificationStatus =
  (typeof PHONE_NUMBER_CODE_VERIFICATION_STATUS)[number];

export const PHONE_NUMBER_MESSAGE_ELIGIBILITY = [
  "BLOCKED",
  "LIMITED",
  "AVAILABLE",
] as const;
export type PhoneNumberMessageEligibility =
  (typeof PHONE_NUMBER_MESSAGE_ELIGIBILITY)[number];

export const PHONE_NUMBER_QUALITY_RATING = [
  "UNKNOWN",
  "RED",
  "YELLOW",
  "GREEN",
] as const;
export type PhoneNumberQualityRating =
  (typeof PHONE_NUMBER_QUALITY_RATING)[number];

export const PHONE_NUMBER_MESSAGING_LIMIT_TIER = [
  "TIER_50",
  "TIER_250",
  "TIER_1K",
  "TIER_10K",
  "TIER_100K",
  "TIER_UNLIMITED",
] as const;
export type PhoneNumberMessagingLimitTier =
  (typeof PHONE_NUMBER_MESSAGING_LIMIT_TIER)[number];

export const PHONE_NUMBER_ACCOUNT_MODE = ["LIVE", "SANDBOX"] as const;
export type PhoneNumberAccountMode = (typeof PHONE_NUMBER_ACCOUNT_MODE)[number];

export const PHONE_NUMBER_NAME_STATUS = [
  "APPROVED",
  "DECLINED",
  "EXPIRED",
  "PENDING_REVIEW",
  "AVAILABLE_WITHOUT_REVIEW",
  "NONE",
] as const;
export type PhoneNumberNameStatus = (typeof PHONE_NUMBER_NAME_STATUS)[number];

export const PHONE_NUMBER_PLATFORM_TYPE = [
  "CLOUD_API",
  "ON_PREMISE",
  "NOT_APPLICABLE",
] as const;
export type PhoneNumberPlatformType =
  (typeof PHONE_NUMBER_PLATFORM_TYPE)[number];

export const PHONE_NUMBER_THROUGHPUT_LEVEL = [
  "STANDARD",
  "HIGH",
  "NOT_APPLICABLE",
] as const;
export type PhoneNumberThroughputLevel =
  (typeof PHONE_NUMBER_THROUGHPUT_LEVEL)[number];

export type PhoneNumber = {
  id: string;
  status: PhoneNumberStatus;
  account_mode: PhoneNumberAccountMode;
  platform_type: PhoneNumberPlatformType;
  messaging_limit_tier: PhoneNumberMessagingLimitTier;
  code_verification_status: PhoneNumberCodeVerificationStatus;
  quality_rating: PhoneNumberQualityRating;
  display_phone_number: string;
  name_status: PhoneNumberNameStatus;
  verified_name: string;
  is_official_business_account: boolean;
  is_on_biz_app: boolean;
  is_pin_enabled: boolean;
  is_preverified_number: boolean;

  /** This field may not be set for test phone numbers */
  last_onboarded_time?: string;

  webhook_configuration?: {
    /** If this Phone Number's webhook configuration is overriden at the WABA level, this field will be set */
    whatsapp_business_account?: string;
    application: string;
  };

  throughput: {
    level: PhoneNumberThroughputLevel;
  };

  health_status: {
    can_send_message: PhoneNumberMessageEligibility;
    entities: {
      id: string;
      entity_type:
        | "PHONE_NUMBER"
        | "WABA"
        | "BUSINESS"
        | "APP"
        | (string & NonNullable<unknown>);
      can_send_message: PhoneNumberMessageEligibility;
      additional_info?: string[];
      errors?: {
        error_code?: string;
        error_description: string;
        possible_solution?: string;
      }[];
    }[];
  };

  whatsapp_business_profile: {
    data: [BusinessProfile];
  };
};

export type ListPhoneNumbersOptions = {
  businessAccountID: BusinessAccountID;
  sort?: string;
  filtering?: string;
  fields?: PhoneNumberFields[];
};

export type ListPhoneNumbersPaylod = {
  data: PhoneNumber[];
};

export type GetPhoneNumberOptions = {
  phoneNumberID: PhoneNumberID;
  fields?: PhoneNumberFields[];
};

export type GetPhoneNumberPayload = PhoneNumber;
