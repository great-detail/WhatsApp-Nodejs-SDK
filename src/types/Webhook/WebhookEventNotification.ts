/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { AccountID } from "../Account.js";
import { BusinessAccountID } from "../BusinessAccount/index.js";
import { WhatsappError } from "../Error.js";
import {
  EventNotificationMessageMessage,
  MessageID,
} from "../Message/index.js";
import { EventNotificationMessageIdentity } from "../Message/MessageIdentity.js";
import { EventNotificationMessageReferral } from "../Message/MessageReferral.js";
import { PhoneNumberID, PhoneNumberString } from "../PhoneNumber.js";
import { PhoneNumberMessagingLimitTier } from "../PhoneNumbers/index.js";
import { TemplateButtonTypes } from "../Templates/TemplateButton.js";
import { TemplateCategory } from "../Templates/TemplateCategory.js";
import { TemplateLanguage } from "../Templates/TemplateLanguage.js";
import { TemplateQualityScore } from "../Templates/TemplateStatus.js";

export type ConversationType =
  | "authentication"
  | "marketing"
  | "utility"
  | "service"
  | "referral_conversation"
  | (string & NonNullable<unknown>);

export type WebhookEventNotificationMessagesChanges = {
  /** Notification type. Value will be messages. */
  field: "messages";

  /** A value object. */
  value: {
    /**
     * Array of contact objects with information for the customer who sent a
     * message to the business.
     */
    contacts: {
      /**
       * The customer's WhatsApp ID. A business can respond to a customer using
       * this ID. This ID may not match the customer's phone number, which is
       * returned by the API as input when sending a message to the customer.
       */
      wa_id: AccountID;

      /** Additional unique, alphanumeric identifier for a WhatsApp user. */
      user_id?: string;

      /** A customer profile object. */
      profile: {
        /** The customer's name. */
        name: string;
      };
    }[];

    /** An array of error objects describing the error. */
    errors: WhatsappError[];

    /**
     * Product used to send the message. Value is always whatsapp.
     *
     * @default 'whatsapp'
     */
    messaging_product: "whatsapp";

    /**
     * Information about a message received by the business that is subscribed to
     * the webhook.
     */
    messages?: ({
      /**
       * The ID for the message that was received by the business. You could use
       * messages endpoint to mark this specific message as read.
       */
      id: MessageID;

      /**
       * Unix timestamp indicating when the WhatsApp server received the message
       * from the customer.
       */
      timestamp: string;

      /**
       * The customer's WhatsApp ID. A business can respond to a customer using
       * this ID. This ID may not match the customer's phone number, which is
       * returned by the API as input when sending a message to the customer.
       */
      from: AccountID;

      /**
       * Context object. Only included when a user replies or interacts with one of
       * your messages.
       */
      context?: {
        /** Set to true if the message received by the business has been forwarded. */
        forwarded: boolean;

        /**
         * Set to true if the message received by the business has been forwarded
         * more than 5 times.
         */
        frequently_forwarded: boolean;

        /** The WhatsApp ID for the customer who replied to an inbound message. */
        from: AccountID;

        /** The message ID for the sent message for an inbound reply. */
        id: MessageID;

        /**
         * Referred product object describing the product the user is requesting
         * information about. You must parse this value if you support Product
         * Enquiry Messages.
         */
        referred_product: {
          /**
           * Unique identifier of the Meta catalog linked to the WhatsApp Business
           * Account.
           */
          catalog_id: string;

          /** Unique identifier of the product in a catalog. */
          product_retailer_id: string;
        };
      };

      /** An array of error objects describing the error. */
      errors?: WhatsappError[];

      /**
       * An identity object. Webhook is triggered when a customer's phone number or
       * profile information has been updated.
       */
      identity: EventNotificationMessageIdentity;

      /**
       * Referral object. When a customer clicks an ad that redirects to WhatsApp,
       * this object is included in the messages object.
       */
      referral?: EventNotificationMessageReferral;
    } & EventNotificationMessageMessage)[];

    /**
     * A metadata object describing the business subscribed to the webhook.
     */
    metadata: {
      /** The phone number that is displayed for a business. */
      display_phone_number: PhoneNumberString;

      /**
       * ID for the phone number. A business can respond to a message using this
       * ID.
       */
      phone_number_id: PhoneNumberID;
    };

    /**
     * Status object for a message that was sent by the business that is
     * subscribed to the webhook.
     */
    statuses?: {
      /**
       * The ID for the message that the business that is subscribed to the
       * webhooks sent to a customer.
       */
      id: MessageID;

      /**
       * The customer's WhatsApp ID. A business can respond to a customer using
       * this ID. This ID may not match the customer's phone number, which is
       * returned by the API as input when sending a message to the customer.
       */
      recipient_id: AccountID;

      /**
       * For a status to be read, it must have been delivered. In some scenarios,
       * such as when a user is in the chat screen and a message arrives, the
       * message is delivered and read almost simultaneously. In this or other
       * similar scenarios, the delivered notification will not be sent back, as it
       * is implied that a message has been delivered if it has been read. The
       * reason for this behavior is internal optimization.
       */
      status: "delivered" | "read" | "sent" | "failed";

      /** Date for the status message. */
      timestamp: number;

      /** An object containing pricing information. */
      pricing: {
        /** Indicates the conversation category.  */
        category: ConversationType;

        /** Type of pricing model used by the business. */
        pricing_model: "CBP" | (string & NonNullable<unknown>);

        /**
         * Indicates if the given message or conversation is billable. Default is
         * true for all conversations, including those inside your free tier limit,
         * except those initiated from free entry points. Free entry point
         * conversation are not billable, false. You will not be charged for free
         * tier limit conversations, but they are considered billable and will be
         * reflected on your invoice.
         *
         * @deprecated
         */
        billable: boolean;
      };

      /** Information about the conversation. */
      conversation: {
        /**
         * Represents the ID of the conversation the given status notification
         * belongs to.
         */
        id: string;

        /**
         * Date when the conversation expires. This field is only present for
         * messages with a `status` set to `sent`.
         */
        expiration_timestamp?: number;

        /** Describes conversation category. */
        origin: {
          /**
           * Indicates conversation category. This can also be referred to as a
           * conversation entry point.
           */
          type: ConversationType;
        };
      };

      /** Arbitrary string included in sent message. */
      biz_opaque_callback_data?: string;
    }[];
  };
};

export type WebhookEventNotificationAccountUpdateChanges = {
  field: "account_update";
  value: {
    event: "PARTNER_APP_INSTALLED" | (string & NonNullable<unknown>);
    phone_number?: string;
    ban_info?: {
      waba_ban_state: string; // TODO: Enum?
      waba_ban_date: string;
    };

    /** Information about a violation on the account */
    violation_info?: {
      violation_type: string; // TODO: Enum?
    };
    lock_info?: {
      // TODO: IS this a string or number? datetime?
      expiration: string | number;
    };

    /** Information about the restrictions on the account */
    restriction_info?: {
      restriction_type: string; // TODO: Enum?
      // TODO: IS this a string or number? datetime?
      expiration: string | number;
    };

    /** Business verification status */
    business_verification_status: string; // TODO: Enum?

    /** Information about the status of the partner's self certification for a client */
    partner_client_certification_info?: {
      client_business_id: string;

      /** Status of certification */
      status: "PENDING" | "APPROVED" | "FAILED" | "DISCARDED" | "REVOKED";

      /** List of rejection reasons for why the request did not pass verification. */
      rejection_reasons: (
        | "LEGAL NAME NOT MATCHING"
        | "WEBSITE NOT MATCHING"
        | "NONE"
        | "BUSINESS NOT ELIGIBLE"
        | "LEGAL NAME NOT FOUND IN DOCUMENTS"
        | "MALFORMED DOCUMENTS"
        | "ADDRESS NOT MATCHING"
      )[];
    };

    /** Information about a waba for business webhooks */
    waba_info: {
      waba_id: AccountID;

      /** WABA owner business ID */
      owner_business_id: BusinessAccountID;

      /** The id of the solution through which this WABA was onboarded */
      solution_id?: string;

      /** List of partner business ids part of the solution */
      solution_partner_business_ids?: string[];
      is_obo_to_shared_migrated?: boolean;
      ad_account_id?: string;
      partner_data?: string;
      partner_app_id: string;
    };

    /** List of countries where two tier price wll be enforced on different time. */
    auth_international_rate_eligibility?: {
      /** The unixtimestamp when the business will be enforced on the two tier pricing for the autentication message. */
      start: number;

      exception_countries: {
        /** Country code for the country where the two tier price will be enforced on a different time stamp. */
        country_code: string;

        /** The actual timestamp that two tier price will be enforced on the country */
        start_time: number;
      }[];
    };
  };
};

export type WebhookEventNotificationAccountAlertsChanges = {
  field: "account_alerts";
  // TODO: Is there any fields?
};

export type WebhookEventNotificationMessageTemplateCategoryUpdateChanges = {
  field: "template_category_update";
  value: {
    message_template_id: number;
    message_template_name: string;
    message_template_language: TemplateLanguage;
    previous_category: TemplateCategory;
    new_category: TemplateCategory;
    correct_category: TemplateCategory;
  };
};

export type WebhookEventNotificationMessageTemplateComponentsUpdateChanges = {
  field: "message_template_components_update";
  value: {
    message_template_id: number;
    message_template_name: string;
    message_template_language: string;
    message_template_title: string;
    message_template_element: string;
    message_template_footer: string;
    message_template_buttons: {
      message_template_button_type: TemplateButtonTypes;
      message_template_button_text: string;
      message_template_button_url?: string;
      message_template_button_phone_number?: string;
    }[];
  };
};

export type WebhookEventNotificationMessageTemplateQualityUpdateChanges = {
  field: "message_template_quality_update";
  value: {
    message_template_id: number;
    message_template_name: string;
    message_template_language: string;
    previous_quality_score: TemplateQualityScore;
    new_quality_score: TemplateQualityScore;
  };
};

export type WebhookEventNotificationMessageTemplateStatusUpdateChanges = {
  field: "message_template_status_update";
  value: {
    message_template_id: number;
    message_template_name: string;
    message_template_language: string;
    event: string; // TODO: Enum?
    reason: string; // TODO: Enum?
    disable_info?: {
      disable_date: string;
    };
    other_info?: {
      title?: string;
      description?: string;
    };
  };
};

export type WebhookEventNotificationPhoneNumberNameUpdateChanges = {
  field: "phone_number_name_update";
  value: {
    display_phone_number: string;
    decision: string; // TODO: Enum?
    requested_verified_name?: string;
    rejection_reason: string; // TODO: Enum? NONE?
  };
};

export type WebhookEventNotificationPhoneNumberQualityUpdateChanges = {
  field: "phone_number_quality_update";
  value: {
    display_phone_number: string;
    event: string; // TODO: Enum?
    current_limit: PhoneNumberMessagingLimitTier;
    old_limit: PhoneNumberMessagingLimitTier;
    max_daily_conversations_per_business: string; // TODO: Enum?
  };
};

export type WebhookEventNotificationAccountReviewUpdateChanges = {
  field: "account_review_update";
  value: {
    decision: string; // TODO: Enum?
  };
};

export type WebhookEventNotificationPaymentConfigurationUpdateChanges = {
  field: "payment_configuration_update";
  value: {
    configuration_name: string;
    provider_name: string;
    provider_mid: string;
    status: string; // TODO: Enum?
    created_timestamp: number;
    updated_timestamp: number;
  };
};

export type WebhookEventNotificationCallsChanges = {
  field: "calls";
  // TODO: Is there any fields?
};

export type WebhookEventNotification = {
  /**
   * The specific webhook a business is subscribed to. The webhook is
   * whatsapp_business_account.
   */
  object: string;

  /** An array of entry objects. */
  entry: {
    /**
     * The WhatsApp Business Account ID for the business that is subscribed to
     * the webhook.
     */
    id: BusinessAccountID;

    /** An array of change objects. */
    changes: (
      | WebhookEventNotificationMessagesChanges
      | WebhookEventNotificationAccountUpdateChanges
      | WebhookEventNotificationAccountReviewUpdateChanges
      | WebhookEventNotificationAccountAlertsChanges
      | WebhookEventNotificationMessageTemplateStatusUpdateChanges
      | WebhookEventNotificationMessageTemplateCategoryUpdateChanges
      | WebhookEventNotificationMessageTemplateComponentsUpdateChanges
      | WebhookEventNotificationMessageTemplateQualityUpdateChanges
      | WebhookEventNotificationPhoneNumberNameUpdateChanges
      | WebhookEventNotificationPhoneNumberQualityUpdateChanges
      | WebhookEventNotificationPaymentConfigurationUpdateChanges
      | WebhookEventNotificationCallsChanges
    )[];
  }[];
};
