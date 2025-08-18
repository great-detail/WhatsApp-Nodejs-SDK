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
import {
  CreateTemplateComponent,
  TemplateComponent,
} from "./TemplateComponents.js";
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

export type CreateCustomTemplateOptions = {
  parameter_format: TemplateParameterFormat;
  components: CreateTemplateComponent[];

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
