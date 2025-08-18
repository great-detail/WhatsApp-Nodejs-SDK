/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { TemplateLanguage } from "../Templates/TemplateLanguage.js";
import { CreateMessageMedia } from "./MessageMedia.js";
import { MessageType } from "./MessageType.js";

export type MessageTemplateComponentNamedParameter = {
  parameter_name: string;
};

export type MessageTemplateComponentPositionalParameter = {
  parameter_name?: never;
};

export type MessageTemplateButtonTextParameter<T> = {
  type: "text";

  /**
   * Developer-defined payload that is returned when the button is clicked in addition to the display text on the button.
   *
   * Required for `quick_reply` buttons.
   */
  payload?: string;
  text?: string;
} & T;

export type MessageTemplateButtonPayloadParameter<T> = {
  type: "payload";

  /**
   * Developer-defined payload that is returned when the button is clicked in addition to the display text on the button.
   *
   * Required for `quick_reply` buttons.
   */
  payload?: string;

  /**
   * Developer-provided suffix that is appended to the predefined prefix URL in the template.
   *
   * Required for URL buttons.
   */
  text?: string;
} & T;

export type MessageTemplateTextParameter<T> = {
  type: "text";

  /**
   * The message’s text. Character limit varies based on the following included component type.
   *
   * For the header component type:
   * - 60 characters
   *
   * For the body component type:
   * - 1024 characters if other component types are included
   * - 32768 characters if body is the only component type included
   */
  text: string;
} & T;

export type MessageTemplateImageParameter<T> = {
  type: MessageType.Image;
  [MessageType.Image]: Omit<CreateMessageMedia, "caption">;
} & T;

export type MessageTemplateDocumentParameter<T> = {
  type: MessageType.Document;
  [MessageType.Document]: Omit<CreateMessageMedia, "caption">;
} & T;

export type MessageTemplateVideoParameter<T> = {
  type: MessageType.Video;
  [MessageType.Video]: Omit<CreateMessageMedia, "caption">;
} & T;

export type MessageTemplateCurrencyParameter<T> = {
  type: "currency";
  currency: {
    /** Default text if localization fails. */
    fallback_value: string;

    /** Currency code as defined in ISO 4217. */
    code: string;

    /** Amount multiplied by 1000. */
    amount_1000: number;
  };
} & T;

export type MessageTemplateDateTimeParameter<T> = {
  type: "date_time";
  date_time: {
    /** Default text. For Cloud API, we always use the fallback value, and we do not attempt to localize using other optional fields. */
    fallback_value: string;
  };
} & T;

export type MessageTemplateHeaderLocationParameter<T> = {
  type: "location";
  location: {
    latitude: string;
    longitude: string;
    name: string;
    address: string;
  };
} & T;

export type MessageTemplateBodyParameter<T> =
  // | MessageTemplateHeaderLocationParameter<T>
  | MessageTemplateTextParameter<T>
  | MessageTemplateImageParameter<T>
  | MessageTemplateDocumentParameter<T>
  | MessageTemplateVideoParameter<T>
  | MessageTemplateCurrencyParameter<T>
  | MessageTemplateDateTimeParameter<T>;

export type MessageTemplateHeaderParameter<T> =
  | MessageTemplateTextParameter<T>
  | MessageTemplateImageParameter<T>
  | MessageTemplateDocumentParameter<T>
  | MessageTemplateVideoParameter<T>
  | MessageTemplateCurrencyParameter<T>
  | MessageTemplateDateTimeParameter<T>
  | MessageTemplateHeaderLocationParameter<T>;

export type MessageTemplateButtonParameter<T> =
  | MessageTemplateButtonPayloadParameter<T>
  | MessageTemplateButtonTextParameter<T>;

export const MESSAGE_TEMPLATE_COMPONENT_TYPES = [
  "header",
  "body",
  "footer",
  "button",
] as const;

export type MessageTemplateComponentType =
  (typeof MESSAGE_TEMPLATE_COMPONENT_TYPES)[number];

type BaseMessageTemplateComponent<
  T extends MessageTemplateComponentType,
  O extends object,
> = {
  type: T;
} & O;

export type HeaderMessageTemplateComponent<T> = BaseMessageTemplateComponent<
  "header",
  {
    parameters: MessageTemplateHeaderParameter<T>[];
  }
>;

export type BodyMessageTemplateComponent<T> = BaseMessageTemplateComponent<
  "body",
  {
    parameters: MessageTemplateBodyParameter<T>[];
  }
>;

// export type FooterMessageComponent<T> = BaseMessageComponent<"footer", {
//   parameters: MessageTemplateFooterParameter<T>[];
// }>;

export type ButtonMessageTemplateComponent<T> = BaseMessageTemplateComponent<
  "button",
  {
    /** Numeric string */
    index: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  } & (
    | {
        sub_type: "quick_reply";
        parameters: (MessageTemplateButtonParameter<T> & {
          payload: Required<MessageTemplateButtonParameter<T>["payload"]>;
        })[];
      }
    | {
        sub_type: "url";
        parameters: (MessageTemplateButtonParameter<T> & {
          text: Required<MessageTemplateButtonParameter<T>["text"]>;
        })[];
      }
  )
>;

// Catalog buttons are inbound only.
// | {
//     sub_type: "catalog";
//     parameters: MessageTemplateButtonParameter<T>[];
//   }

export type MessageTemplateComponent<T> =
  | HeaderMessageTemplateComponent<T>
  | BodyMessageTemplateComponent<T>
  // | FooterMessageComponent<T>
  | ButtonMessageTemplateComponent<T>;

export type CreateMessageTemplate = {
  /** Name of the template. */
  name: string;

  /** Specifies the language the template may be rendered in. */
  language: {
    /**
     * The language policy the message should follow.
     *
     * @see https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#language-policy-options
     */
    policy: "deterministic";

    /**
     * The code of the language or locale to use.
     *
     * Accepts both language and language_locale formats (e.g., en and en_US).
     *
     * @see https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#supported-languages
     */
    code: TemplateLanguage;
  };

  /** Array of components objects containing the parameters of the message. */
  components:
    | MessageTemplateComponent<MessageTemplateComponentNamedParameter>[]
    | MessageTemplateComponent<MessageTemplateComponentPositionalParameter>[];

  /**
   * Namespace of the template.
   *
   * @deprecated Used by On-Premises API Only
   */
  namespace?: string;
};
