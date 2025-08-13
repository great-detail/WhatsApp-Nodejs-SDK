/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

/** @deprecated */
export type BusinessAccountID = WhatsappBusinessAccountID;
/** WhatsApp Business Account ID */
export type WhatsappBusinessAccountID = string;

export const WHATSAPP_BUSINESS_ACCOUNT_VERIFICATION_STATUS = [
  "not_verified",
  "expired",
  "failed",
  "ineligible",
  "pending",
  "pending_need_more_info",
  "pending_submission",
  "rejected",
  "revoked",
  "verified",
] as const;
export type WhatsappBusinessAccountVerificationStatus =
  (typeof WHATSAPP_BUSINESS_ACCOUNT_VERIFICATION_STATUS)[number];

export type WhatsappBusinessAccountFields =
  | "account_review_status"
  | "id"
  | "name"
  | "message_template_namespace" // Note: Not needed for Cloud API, only On-Prem
  | "currency"
  | "on_behalf_of_business_info"
  | "primary_funding_id"
  | "purchase_order_number"
  | "timezone_id"
  | "owner_business_info"
  | "business_verification_status"
  | "country"
  | "currency"
  | "health_status"
  | "is_enabled_for_insights"
  | "marketing_messages_lite_api_status"
  | "marketing_messages_onboarding_status"
  | "ownership_type"
  | "status";

export type WhatsappBusinessAccount = {
  id: WhatsappBusinessAccountID;
  name: string;
  account_review_status: string;
  message_template_namespace?: string;
  timezone_id: string;
  owner_business_info: {
    id: string;
    name: string;
  };
  on_behalf_of_business_info?: {
    id: string;
    name: string;
    status: string;
    type: string;
  };
  business_verification_status: WhatsappBusinessAccountVerificationStatus;
  country?: string;
  currency: string;
  is_enabled_for_insights: boolean;
  is_shared_with_partners?: boolean;
  primary_funding_id?: string;
  purchase_order_number?: string;
  marketing_messages_lite_api_status:
    | "INELIGIBLE"
    | "ELIGIBLE"
    | "ONBOARDED"
    | "UNKNOWN";
  marketing_messages_onboarding_status:
    | "INELIGIBLE_ON_BEHALF_OF_WABA"
    | "INELIGIBLE_INACTIVE_OR_RESTRICTED"
    | "INELIGIBLE_COUNTRY_NOT_SUPPORTED"
    | "INELIGIBLE_USING_WHATSAPP_BUSINESS_APP"
    | "ELIGIBLE"
    | "PENDING_VALID_PAYMENT_METHOD"
    | "PENDING_INTERNAL_SETUP"
    | "ONBOARDED";
  ownership_type: "CLIENT_OWNED" | unknown;
  status: "ACTIVE";
  // TODO: Add health_status
};

export type GetWhatsappBusinessAccountOptions = {
  fields?: WhatsappBusinessAccountFields[];
};

export type GetWhatsappBusinessAccountPayload = WhatsappBusinessAccount;
