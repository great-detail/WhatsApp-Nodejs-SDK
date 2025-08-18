/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { TemplateButton } from "./TemplateButton.js";
import {
  TemplateCategory,
  TemplateIndustry,
  TemplateSubcategory,
  TemplateTopic,
  TemplateUseCase,
} from "./TemplateCategory.js";
import { TemplateLanguage } from "./TemplateLanguage.js";
import {
  TemplateParameterFormat,
  TemplateQualityScore,
  TemplateRejectionReason,
  TemplateStatus,
} from "./TemplateStatus.js";

export * from "./TemplateLanguage.js";
export * from "./TemplateStatus.js";
export * from "./TemplateCategory.js";
export * from "./TemplateButton.js";

export const TEMPLATE_COMPONENT_TYPES = [
  "HEADER",
  "BODY",
  "FOOTER",
  "BUTTONS",
] as const;

export type TemplateComponentType = (typeof TEMPLATE_COMPONENT_TYPES)[number];

type BaseTemplateComponent<
  T extends TemplateComponentType,
  P extends object,
> = {
  type: T;
} & P;

export type HeaderTemplateComponent = BaseTemplateComponent<
  "HEADER",
  {
    format: "TEXT";
    text?: string;
    example?: {
      header_text:
        | string[]
        | {
            param_name: string;
            example: string;
          }[];
    };
  }
>;

export type BodyTemplateComponent = BaseTemplateComponent<
  "BODY",
  {
    text?: string;
    example?: {
      body_text: [
        | string[]
        | {
            param_name: string;
            example: string;
          }[],
      ];
    };
  }
>;

export type FooterTemplateComponent = BaseTemplateComponent<
  "FOOTER",
  {
    text?: string;
  }
>;

export type ButtonsTemplateComponent = BaseTemplateComponent<
  "BUTTONS",
  {
    buttons: TemplateButton[];
  }
>;

export type TemplateComponent =
  | HeaderTemplateComponent
  | BodyTemplateComponent
  | FooterTemplateComponent
  | ButtonsTemplateComponent;

export type AccountTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  correct_category?: TemplateCategory;
  sub_category?: TemplateSubcategory;
  previous_category?: TemplateCategory;
  status: TemplateStatus;
  rejected_reason: TemplateRejectionReason;
  cta_url_link_tracking_opted_out: boolean;
  library_template_name?: string;
  message_send_ttl_seconds?: number;
  parameter_format: TemplateParameterFormat;
  language: TemplateLanguage;
  quality_score: {
    /** Uses seconds since epoch */
    date: number;
    score: TemplateQualityScore;
  };
  components: TemplateComponent[];
};

export type LibraryTemplate = {
  /** Unique identifier for the template */
  id: string;

  /** Name of the template (unique per account, lowercase, underscores allowed) */
  name: string;

  /** Language code for the template (e.g., 'en_US') */
  language: TemplateLanguage;

  /** Category of the template (e.g., AUTHENTICATION, MARKETING, UTILITY) */
  category: TemplateCategory;

  /** Topic of the template, used for classification */
  topic: TemplateTopic;

  /** Use case for the template (e.g., ACCOUNT_CREATION_CONFIRMATION) */
  usecase: TemplateUseCase;

  /** List of industries relevant to the template */
  industry: TemplateIndustry[];

  /** Header text of the template (optional, can be text, image, video, or document) */
  header: string;

  /** Body text of the template (supports parameters, required) */
  body: string;

  /** Optional list of parameter names used in the body */
  body_params?: string[];

  /** Types of parameters used in the body (e.g., TEXT, NUMBER, DATE) */
  body_param_types: (
    | "TEXT"
    | "ADDRESS"
    | "AMOUNT"
    | "DATE"
    | "PHONE NUMBER"
    | "EMAIL"
    | "NUMBER"
  )[];

  /** Array of buttons (quick replies, URLs, phone numbers, etc.) associated with the template */
  buttons: TemplateButton[];
};

export type GetTemplateFields =
  | "name"
  | "parameter_format"
  | "components"
  | "category"
  | "correct_category"
  | "previous_category"
  | "sub_category"
  | "rejected_reason"
  | "language"
  | "library_template_name"
  | "quality_score"
  | "status";

export type GetTemplateOptions = {
  fields?: GetTemplateFields[];
};

export type GetTemplatePayload = AccountTemplate;

export type ListTemplatesFields = GetTemplateFields;

export type ListTemplatesOptions = {
  name_or_content?: string;
  category?: TemplateCategory | TemplateCategory[];
  language?: TemplateLanguage | TemplateLanguage[];
  status?: TemplateStatus | TemplateStatus[];
  quality_score?: TemplateQualityScore | TemplateQualityScore[];
  limit?: number;
  fields?: ListTemplatesFields[];
};

export type ListTemplatesPayload = AccountTemplate[];

export type ListLibraryTemplatesOptions = {
  search?: string;
  category?: TemplateCategory | TemplateCategory[];
  language?: TemplateLanguage | TemplateLanguage[];
  topic?: TemplateTopic | TemplateTopic[];
  usecase?: TemplateUseCase | TemplateUseCase[];
  industry?: TemplateIndustry | TemplateIndustry[];
  limit?: number;
};

export type ListLibraryTemplatesPayload = LibraryTemplate[];

export type CreateTextHeaderTemplateComponent = BaseTemplateComponent<
  "HEADER",
  {
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
  }
>;

export type CreateMediaHeaderTemplateComponent<
  T extends "IMAGE" | "VIDEO" | "DOCUMENT",
> = BaseTemplateComponent<
  "HEADER",
  {
    format: T;
    exmaple: {
      header_handle: [string];
    };
  }
>;

export type CreateImageHeaderTemplateComponent =
  CreateMediaHeaderTemplateComponent<"IMAGE">;

export type CreateVideoHeaderTemplateComponent =
  CreateMediaHeaderTemplateComponent<"VIDEO">;

export type CreateDocumentHeaderTemplateComponent =
  CreateMediaHeaderTemplateComponent<"DOCUMENT">;

export type CreateLocationHeaderTemplateComponent = BaseTemplateComponent<
  "HEADER",
  {
    format: "LOCATION";
  }
>;

export type CreateHeaderTemplateComponent =
  | CreateTextHeaderTemplateComponent
  | CreateImageHeaderTemplateComponent
  | CreateVideoHeaderTemplateComponent
  | CreateDocumentHeaderTemplateComponent
  | CreateLocationHeaderTemplateComponent;

export type CreateBodyTemplateComponent = BaseTemplateComponent<
  "BODY",
  {
    text: string;
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
  }
>;

export type CreateFooterTemplateComponent = BaseTemplateComponent<
  "FOOTER",
  {
    text: string;
  }
>;

export const CREATE_BUTTONS_TEMPLATE_COMPONENT_TYPES = [
  "QUICK_REPLY",
  "URL",
  "PHONE_NUMBER",
  "COPY_CODE",
] as const;

export type CreateButtonsTemplateComponentType =
  (typeof CREATE_BUTTONS_TEMPLATE_COMPONENT_TYPES)[number];

type BaseButton<T extends CreateButtonsTemplateComponentType, B> = {
  type: T;
} & B;

export type CreateButtonsTemplateComponent = BaseTemplateComponent<
  "BUTTONS",
  {
    buttons: (
      | BaseButton<
          "QUICK_REPLY",
          {
            text: string;
            payload?: string;
          }
        >
      | BaseButton<
          "URL",
          {
            text: string;
            url?: string;
          }
        >
      | BaseButton<
          "PHONE_NUMBER",
          {
            text: string;
            phone_number?: string;
          }
        >
      | BaseButton<
          "COPY_CODE",
          {
            text: string;
            code?: string;
          }
        >
    )[];
  }
>;

export type CreateTemplateComponent =
  | CreateHeaderTemplateComponent
  | CreateBodyTemplateComponent
  | CreateFooterTemplateComponent
  | CreateButtonsTemplateComponent;

export type CreateCustomTemplateOptions = {
  parameter_format: TemplateParameterFormat;
  components: unknown[];

  library_template_name?: never;
  library_template_button_inputs?: never;
};

export type CreateLibraryTemplateOptions = {
  library_template_name: string;

  /** Use `JSON.stringify([...])` to stringify */
  library_template_button_inputs?: string;

  components?: never;
  parameter_format?: never;
};

export type CreateTemplateBaseOptions = {
  name: string;

  /** Set to "UTILITY" for Library Templates */
  category: TemplateCategory;
  language: TemplateLanguage;

  /** @deprecated */
  allow_category_change?: boolean;
};

export type CreateTemplateOptions = CreateTemplateBaseOptions &
  (CreateCustomTemplateOptions | CreateLibraryTemplateOptions);

export type CreateTemplatePayload = {
  id: string;
  status: TemplateStatus;
  category: TemplateCategory;
};

export type DeleteTemplateOptions = {
  hsm_id?: string;
  name: string;
};

export type DeleteTemplatePayload = { success: boolean };
