/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

/** WhatsApp Business Account ID */
export type BusinessAccountID = string;

export const BUSINESS_ACCOUNT_VERIFICATION_STATUS = [
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
export type BusinessAccountVerificationStatus =
  (typeof BUSINESS_ACCOUNT_VERIFICATION_STATUS)[number];

export type BusinessAccountFields =
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
  | "ownership_type"
  | "status";

export type BusinessAccount = {
  id: BusinessAccountID;
  name: string;
  account_review_status: string;
  message_template_namespace: string;
  timezone_id: string;
  owner_business_info: {
    id: string;
    name: string;
  };
  on_behalf_of_business_info: {
    id: string;
    name: string;
    status: string;
    type: string;
  };
  business_verification_status: BusinessAccountVerificationStatus;
  country?: string;
  currency: string;
  is_enabled_for_insights: boolean;
  marketing_messages_lite_api_status: "INELIGIBLE" | unknown;
  ownership_type: "CLIENT_OWNED" | unknown;
  status: "ACTIVE";
};

export type GetBusinessAccountOptions = {
  fields?: BusinessAccountFields[];
};

export type GetBusinessAccountPayload = BusinessAccount;
