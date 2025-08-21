/**
 * WhatsApp NodeJS SDK.
 *
 * @author    Great Detail Ltd <info@greatdetail.com>
 * @author    Dom Webber <dom.webber@greatdetail.com>
 * @see       https://greatdetail.com
 */

import { CreateTemplateButton, TemplateButton } from "./TemplateButton";

export const TEMPLATE_COMPONENT_TYPES = [
  "HEADER",
  // "LIMITED_TIME_OFFER", // TODO: Re-add this
  "BODY",
  "FOOTER",
  "BUTTONS",
] as const;

export type TemplateComponentType = (typeof TEMPLATE_COMPONENT_TYPES)[number];

type BaseTemplateComponent<T extends { type: TemplateComponentType }> = T;

export type TemplateComponent =
  | HeaderTemplateComponent
  | BodyTemplateComponent
  | FooterTemplateComponent
  | ButtonsTemplateComponent;

export type HeaderTemplateComponent = BaseTemplateComponent<{
  type: "HEADER";
  format: "TEXT";
  text?: string;
  example?:
    | {
        header_text: [string[]];
        header_text_named_params?: never;
      }
    | {
        header_text?: never;
        header_text_named_params: {
          param_name: string;
          example: string;
        }[];
      };
}>;

export type CreateHeaderTemplateComponent =
  | CreateTextHeaderTemplateComponent
  | CreateImageHeaderTemplateComponent
  | CreateVideoHeaderTemplateComponent
  | CreateDocumentHeaderTemplateComponent
  | CreateLocationHeaderTemplateComponent;

export type CreateTextHeaderTemplateComponent = BaseTemplateComponent<{
  type: "HEADER";
  format: "TEXT";
  text?: string;
  example?:
    | {
        header_text: string[];
        header_text_named_params?: never;
      }
    | {
        header_text?: never;
        header_text_named_params: {
          param_name: string;
          example: string;
        }[];
      };
}>;

export type CreateMediaHeaderTemplateComponent<
  T extends "IMAGE" | "VIDEO" | "DOCUMENT",
> = BaseTemplateComponent<{
  type: "HEADER";
  format: T;
  exmaple: {
    header_handle: [string];
  };
}>;

export type CreateImageHeaderTemplateComponent =
  CreateMediaHeaderTemplateComponent<"IMAGE">;

export type CreateVideoHeaderTemplateComponent =
  CreateMediaHeaderTemplateComponent<"VIDEO">;

export type CreateDocumentHeaderTemplateComponent =
  CreateMediaHeaderTemplateComponent<"DOCUMENT">;

export type CreateLocationHeaderTemplateComponent = BaseTemplateComponent<{
  type: "HEADER";
  format: "LOCATION";
}>;

export type BodyTemplateComponent = BaseTemplateComponent<{
  type: "BODY";
  text: string;
  example?:
    | {
        body_text: [string[]];
        body_text_named_params?: never;
      }
    | {
        body_text?: never;
        body_text_named_params: {
          param_name: string;
          example: string;
        }[];
      };
}>;

export type CreateBodyTemplateComponent = BaseTemplateComponent<{
  type: "BODY";
  text: string;
  add_security_recommendation?: boolean;
  example?:
    | {
        body_text: string[];
        body_text_named_params?: never;
      }
    | {
        body_text?: never;
        body_text_named_params: {
          param_name: string;
          example: string;
        }[];
      };
}>;

// export type CreateLimitedTimeOfferTemplateComponent = BaseTemplateComponent<
//   "LIMITED_TIME_OFFER",
//   {
//     limited_time_offer: {
//       text: string;
//       has_expiration?: boolean;
//     };
//   }
// >;

export type FooterTemplateComponent = BaseTemplateComponent<{
  type: "FOOTER";
  text: string;
}>;

export type CreateFooterTemplateComponent = BaseTemplateComponent<{
  type: "FOOTER";
  text: string;
  code_expiration_minutes?: number;
}>;

export type ButtonsTemplateComponent = BaseTemplateComponent<{
  type: "BUTTONS";
  buttons: TemplateButton[];
}>;

export type CreateButtonsTemplateComponent = BaseTemplateComponent<{
  type: "BUTTONS";
  buttons: CreateTemplateButton[];
}>;

export type CreateTemplateComponent =
  | CreateHeaderTemplateComponent
  | CreateBodyTemplateComponent
  | CreateFooterTemplateComponent
  | CreateButtonsTemplateComponent;
