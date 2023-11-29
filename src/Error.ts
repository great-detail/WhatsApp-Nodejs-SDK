/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

/**
 * WhatsApp API Error Codes.
 * The documented possible error codes when working with the WhatsApp API.
 *
 * @since 4.0.0
 * @see {@link https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes}
 * @see {@link https://developers.facebook.com/docs/whatsapp/on-premises/errors}
 */
const Error = {
  506: "Duplicate Post",
  131043: "Message expired",
  131001: "Message too long",
  131002: "Invalid recipient type",
  131006: "Resource not found",
  133001: "Decryption Error",
  133002: "Backup Blob Decryption Error",
  133003: "Recovery Token Decryption Error",
  133007: "Account Blocked",
  136025: "Verify code error",

  0: "AuthException",
  3: "API Method",
  10: "Permission Denied",
  190: "Access token has expired",
  200: "API Permission",
  // 200-299 are general "API Permission" error codes and will be treated as
  // unknown error codes for now.
  299: "API Permission",
  4: "API Too Many Calls",
  80007: "Rate limit issues",
  130429: "Rate limit hit",
  131048: "Spam Rate limit hit",
  131056: "(Business Account, Consumer Account) pair rate limit hit",
  368: "Temporarily blocked for policies violations",
  131031: "Account has been locked",
  1: "API Unknown",
  2: "API Service",
  33: "Parameter value is not valid",
  100: "Invalid parameter",
  130472: "User's number is part of an experiment",
  131000: "Something went wrong",
  131005: "Access denied",
  131008: "Required parameter is missing",
  131009: "Parameter value is not valid",
  131016: "Service unavailable",
  131021: "Recipient cannot be sender",
  131026: "Message Undeliverable",
  131042: "Business eligibility payment issue",
  131045: "Incorrect certificate",
  131047: "Re-engagement message",
  131051: "Unsupported message type",
  131052: "Media download error",
  131053: "Media upload error",
  132000: "Template Param Count Mismatch",
  132001: "Template does not exist",
  132005: "Template Hydrated Text Too Long",
  132007: "Template Format Character Policy Violated",
  132012: "Template Parameter Format Mismatch",
  132015: "Template is Paused",
  132016: "Template is Disabled",
  132068: "Flow is blocked",
  132069: "Flow is throttled",
  133000: "Incomplete Deregistration",
  133004: "Server Temporarily Unavailable",
  133005: "Two step verification PIN Mismatch",
  133006: "Phone number re-verification needed",
  133008: "Too Many two step verification PIN Guesses",
  133009: "Two step verification PIN Guessed Too Fast",
  133010: "Phone number Not Registered",
  133015:
    "Please wait a few minutes before attempting to register this phone number",
  135000: "Generic user error",

  400: "Media download error",
  402: "Business eligibility — Payment issue",
  408: "Message is not valid",
  410: "Message expired",
  429: "Rate limit hit",
  430: "Unsigned certificate",
  432: "Certificate ID mismatch",
  433: "Certificate signature invalid",
  470: "Re-engagement message",
  471: "Spam rate limit hit",
  472: "User's number is part of an experiment",
  480: "User potentially changed",
  500: "Generic error",
  501: "Message type is not currently supported",
  1000: "Generic error",
  1001: "Message too long",
  1002: "Invalid recipient type",
  1004: "Resource already exists",
  1005: "Access denied",
  1006: "Resource not found",
  1007: "Recipient blocked to receive message (Deprecated)",
  1008: "Required parameter is missing",
  1009: "Parameter value is not valid",
  1010: "Parameter is not required",
  1011: "Service not ready",
  1013: "User is not valid",
  1014: "Internal error",
  1015: "Too many requests",
  1016: "System overloaded",
  1017: "Not Primary Master",
  1018: "Not Primary Coreapp",
  1021: "Bad User",
  1022: "Webhooks URL is not configured",
  1023: "Database error occurred",
  1024: "Password Change Required",
  1025: "Invalid Request",
  1026: "Receiver incapable",
  1028: "A user_identity_changed system notification requires acknowledgement",
  1031: "Sender account has been locked",
  2000: "Template Param Count Mismatch",
  2001: "Template Missing",
  2002: "Template Fetch Failed",
  2003: "Template Pack Missing",
  2004: "Template Param Length Too Long",
  2005: "Template Hydrated Text Too Long",
  2006: "Template White Space Policy Violated",
  2007: "Template Format Character Policy Violated",
  2008: "Template Media Format Unsupported",
  2009: "Template Required Component Missing",
  2010: "Template Invalid Hydrated URL",
  2011: "Template Invalid Phone Number",
  2012: "Template Parameter Format Mismatch",
  2013: "Template Buttons Unsupported",
  2014: "Expected Namespace is Empty",
  2015: "Invalid number of sections",
  2016: "Invalid number of rows",
  2017: "Character Policy Violated",
  2023: "Invalid number of product",
  2024: "Catalog ID not found",
  2025: "Catalog ID not linked to API number",
  2026: "Missing products",
  2027: "No products found",
  2028: "List all products failed compliance",
  2029: "List some products failed compliance",
  2030: "List mixed products invalid and failed compliance",
  2036: "Invalid Header Structure",
  2050: "Missing Compliance Info",
  2060: "Template Rejected",
  2061: "Template Paused",
  2062: "Template Disabled",
  2068: "Flow is blocked",
  2069: "Flow is throttled",
} as const;

export default Error;
export type ErrorCode = keyof typeof Error;
export type ErrorMessage = (typeof Error)[ErrorCode];
export type ErrorObject = {
  code: ErrorCode;
  error_subcode?: number;
  message: ErrorMessage;
  type: string;
  error_data?: {
    messaging_product: "whatsapp";
    details: string;
  };
  fbtrace_id: string;
};
