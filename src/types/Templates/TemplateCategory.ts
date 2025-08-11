/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export const TEMPLATE_CATEGORIES = [
  "AUTHENTICATION",
  "MARKETING",
  "UTILITY",
] as const;

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

export const TEMPLATE_SUBCATEGORIES = [
  "ORDER_DETAILS",
  "ORDER_STATUS",
] as const;

export type TemplateSubcategory = (typeof TEMPLATE_SUBCATEGORIES)[number];

export const TEMPLATE_INDUSTRIES = [
  "E_COMMERCE",
  "FINANCIAL_SERVICES",
] as const;

export type TemplateIndustry = (typeof TEMPLATE_INDUSTRIES)[number];

export const TEMPLATE_TOPICS = [
  // "ACCOUNT_UPDATE",
  "ACCOUNT_UPDATES",
  "CUSTOMER_FEEDBACK",
  "EVENT_REMINDER",
  "FIXED_TEMPLATE_PRICE_TEST",
  "IDENTITY_VERIFICATION",
  "ORDER_MANAGEMENT",
  "PAYMENTS",
] as const;

export type TemplateTopic = (typeof TEMPLATE_TOPICS)[number];

export const TEMPLATE_USECASES = [
  "ACCOUNT_CREATION_CONFIRMATION",
  "PAYMENT_DUE_REMINDER",
  "FEEDBACK_SURVEY",
  "PAYMENT_ACTION_REQUIRED",
  "SHIPMENT_CONFIRMATION",
  "PAYMENT_OVERDUE",
  "DELIVERY_UPDATE",
  "PAYMENT_CONFIRMATION",
  "ORDER_DELAY",
  "FRAUD_ALERT",
  "DELIVERY_FAILED",
  "AUTO_PAY_REMINDER",
  "DELIVERY_CONFIRMATION",
  "PAYMENT_SCHEDULED",
  "ORDER_PICK_UP",
  "PAYMENT_REJECT_FAIL",
  "ORDER_ACTION_NEEDED",
  "STATEMENT_AVAILABLE",
  "ORDER_CONFIRMATION",
  "LOW_BALANCE_WARNING",
  "ORDER_OR_TRANSACTION_CANCEL",
  "RECEIPT_ATTACHMENT",
  "RETURN_CONFIRMATION",
  "STATEMENT_ATTACHMENT",
  "TRANSACTION_ALERT",
] as const;

export type TemplateUseCase = (typeof TEMPLATE_USECASES)[number];
