/**
 * WhatsApp NodeJS SDK.
 *
 * @author    Great Detail Ltd <info@greatdetail.com>
 * @author    Dom Webber <dom.webber@greatdetail.com>
 * @see       https://greatdetail.com
 */

export const TEMPLATE_STATUSES = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "IN_APPEAL",
  "PAUSED",
  "PENDING_DELETION",
  "DELETED",
  "DISABLED",
  "LIMIT_EXCEEDED",
];

export type TemplateStatus = (typeof TEMPLATE_STATUSES)[number];

export const TEMPLATE_QUALITY_SCORES = ["GREEN", "YELLOW", "RED", "UNKNOWN"];

export type TemplateQualityScore = (typeof TEMPLATE_QUALITY_SCORES)[number];

export type TemplateRejectionReason =
  | "ABUSIVE_CONTENT"
  | "INVALID_FORMAT"
  | "PROMOTIONAL"
  | "TAG_CONTENT_MISMATCH"
  | "SCAM"
  | "NONE";

export type TemplateParameterFormat = "POSITIONAL" | "NAMED";
