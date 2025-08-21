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
  "COPY_CODE",
  "URL",
  "PHONE_NUMBER",
  "OTP",
  "MPM",
  "SPM",
  "CATALOG",
  "FLOW",
  "VOICE_CALL",
  "APP",
] as const;

export type TemplateButtonType = (typeof TEMPLATE_BUTTON_TYPES)[number];

export const CREATE_TEMPLATE_BUTTON_TYPES = [
  ...TEMPLATE_BUTTON_TYPES,
  // "SPM",
] as const;

export type CreateTemplateButtonType =
  (typeof CREATE_TEMPLATE_BUTTON_TYPES)[number];

type TemplateButtonBase<T extends { type: TemplateButtonType }> = T;
type CreateTemplateButtonBase<T extends { type: CreateTemplateButtonType }> = T;

export type TemplateButton =
  | QuickReplyTemplateButton
  | CopyCodeTemplateButton
  | URLTemplateButton
  | PhoneNumberTemplateButton
  | OTPTemplateButton
  | MPMTemplateButton
  | CatalogTemplateButton
  | FlowTemplateButton
  | VoiceCallTemplateButton
  | AppTemplateButton;

export type CreateTemplateButton =
  | CreateQuickReplyTemplateButton
  | CreateCopyCodeTemplateButton
  | CreateURLTemplateButton
  | CreatePhoneNumberTemplateButton
  | CreateOTPTemplateButton
  | CreateMPMTemplateButton
  | CreateSPMTemplateButton
  | CreateOTPTemplateButton
  | CreateFlowTemplateButton;

export type QuickReplyTemplateButton = TemplateButtonBase<{
  type: "QUICK_REPLY";
  text: string;
}>;

export type CreateQuickReplyTemplateButton = CreateTemplateButtonBase<{
  type: "QUICK_REPLY";
  text: string;
  // payload?: string;
}>;

export type CopyCodeTemplateButton = TemplateButtonBase<{
  type: "COPY_CODE";
  text: string;
}>;

export type CreateCopyCodeTemplateButton = CreateTemplateButtonBase<{
  type: "COPY_CODE";
  text: string;
  example: string;
}>;

export type URLTemplateButton = TemplateButtonBase<{
  type: "URL";
  text: string;
  url: string;
}>;

export type CreateURLTemplateButton = CreateTemplateButtonBase<{
  type: "URL";
  text: string;
  url: string;
  example?: [string];
}>;

export type PhoneNumberTemplateButton = TemplateButtonBase<{
  type: "PHONE_NUMBER";
  text: string;
  phone_number: string;
}>;

export type CreatePhoneNumberTemplateButton = CreateTemplateButtonBase<{
  type: "PHONE_NUMBER";
  text: string;
  phone_number: string;
}>;

export type OTPTemplateButton = TemplateButtonBase<{
  type: "OTP";
  text?: string;
  otp_type: "COPY_CODE" | "ONE_TAP" | "ZERO_TAP";
  zero_tap_terms_accepted: "TRUE" | "FALSE";
  code_expiration_minutes: number;
}>;

export type CreateOneTapOTPTemplateButton = CreateTemplateButtonBase<{
  type: "OTP";
  otp_type: "ONE_TAP";
  supported_apps: {
    package_name: string;
    signature_hash: string;
  }[];
}>;

export type CreateCopyCodeOTPTemplateButton = CreateTemplateButtonBase<{
  type: "OTP";
  otp_type: "COPY_CODE";
}>;

export type CreateZeroTapOTPTemplateButton = CreateTemplateButtonBase<{
  type: "OTP";
  otp_type: "ZERO_TAP";
}>;

export type CreateOTPTemplateButton =
  | CreateOneTapOTPTemplateButton
  | CreateCopyCodeOTPTemplateButton
  | CreateZeroTapOTPTemplateButton;

export type MPMTemplateButton = TemplateButtonBase<{
  type: "MPM";
  text?: string; // TODO: Clarify this field
}>;

export type CreateMPMTemplateButton = CreateTemplateButtonBase<{
  type: "MPM";
  text: string;
}>;

export type SPMTemplateButton = TemplateButtonBase<{
  type: never; // SPM is not currently supported
}>;

export type CreateSPMTemplateButton = CreateTemplateButtonBase<{
  type: "SPM";
  text: string;
}>;

export type CatalogTemplateButton = TemplateButtonBase<{
  type: "CATALOG";
  text?: string; // TODO: Clarify this field
}>;

export type FlowTemplateButton = TemplateButtonBase<{
  type: "FLOW";
  text?: string; // TODO: Clarify this field
}>;

export type CreateFlowTemplateButton = CreateTemplateButtonBase<{
  type: "FLOW";
  text: string;
  flow_id?: string;
  flow_name?: string;
  flow_json?: string;
  flow_action?: string;
  navigate_screen?: string;
  icon?: "DOCUMENT" | "PROMOTION" | "REVIEW";
}>;

export type VoiceCallTemplateButton = TemplateButtonBase<{
  type: "VOICE_CALL";
  text?: string; // TODO: Clarify this field
}>;

export type AppTemplateButton = TemplateButtonBase<{
  type: "APP";
  text?: string; // TODO: Clarify this field
}>;
