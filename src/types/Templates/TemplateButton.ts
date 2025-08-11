/**
 * WhatsApp NodeJS SDK.
 *
 * @author    Great Detail Ltd <info@greatdetail.com>
 * @author    Dom Webber <dom.webber@greatdetail.com>
 * @see       https://greatdetail.com
 */

export const TEMPLATE_MAX_BUTTONS = 10;

export const TEMPLATE_BUTTON_TYPES = [
  "QUICK_REPLY",
  "URL",
  "PHONE_NUMBER",
  "OTP",
  "MPM",
  "CATALOG",
  "FLOW",
  "VOICE_CALL",
  "APP",
] as const;

export type TemplateButtonTypes = (typeof TEMPLATE_BUTTON_TYPES)[number];

type TemplateButtonBase<T extends { type: TemplateButtonTypes }> = T;

export type TemplateButton =
  | QuickReplyTemplateButton
  | URLTemplateButton
  | PhoneNumberTemplateButton
  | OTPTemplateButton
  | MPMTemplateButton
  | CatalogTemplateButton
  | FlowTemplateButton
  | VoiceCallTemplateButton
  | AppTemplateButton;

export type QuickReplyTemplateButton = TemplateButtonBase<{
  type: "QUICK_REPLY";
  text: string;
}>;

export type URLTemplateButton = TemplateButtonBase<{
  type: "URL";
  text?: string;
  url: string;
}>;

export type PhoneNumberTemplateButton = TemplateButtonBase<{
  type: "PHONE_NUMBER";
  text?: string;
  phone_number: string;
}>;

export type OTPTemplateButton = TemplateButtonBase<{
  type: "OTP";
  text?: string;
  otp_type: "COPY_CODE" | "ONE_TAP" | "ZERO_TAP";
  zero_tap_terms_accepted: "TRUE" | "FALSE";
  code_expiration_minutes: number;
}>;

export type MPMTemplateButton = TemplateButtonBase<{
  type: "MPM";
  text?: string; // TODO: Clarify this field
}>;

export type CatalogTemplateButton = TemplateButtonBase<{
  type: "CATALOG";
  text?: string; // TODO: Clarify this field
}>;

export type FlowTemplateButton = TemplateButtonBase<{
  type: "FLOW";
  text?: string; // TODO: Clarify this field
}>;

export type VoiceCallTemplateButton = TemplateButtonBase<{
  type: "VOICE_CALL";
  text?: string; // TODO: Clarify this field
}>;

export type AppTemplateButton = TemplateButtonBase<{
  type: "APP";
  text?: string; // TODO: Clarify this field
}>;
