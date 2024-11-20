/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { AccountID, MessageID } from "../ID.js";

export enum EventNotificationStatusReason {
  /**
   * A webhook is triggered when a message sent by a business has been
   * delivered.
   *
   * @since 4.2.0
   */
  delivered = "delivered",

  /**
   * A webhook is triggered when a message sent by a business has been read.
   *
   * @since 4.2.0
   */
  read = "read",

  /**
   * A webhook is triggered when a business sends a message to a customer.
   *
   * @since 4.2.0
   */
  sent = "sent",
  failed = "failed",
}

export enum EventNotificationStatusConversationType {
  /**
   * Indicates the conversation was opened by a business sending template
   * categorized as AUTHENTICATION to the customer. This applies any time it
   * has been more than 24 hours since the last customer message.
   *
   * @since 4.2.0
   */
  authentication = "authentication",

  /**
   * Indicates the conversation was opened by a business sending template
   * categorized as MARKETING to the customer. This applies any time it has
   * been more than 24 hours since the last customer message.
   *
   * @since 4.2.0
   */
  marketing = "marketing",

  /**
   * Indicates the conversation was opened by a business sending template
   * categorized as UTILITY to the customer. This applies any time it has been
   * more than 24 hours since the last customer message.
   *
   * @since 4.2.0
   */
  utility = "utility",

  /**
   * Indicates that the conversation opened by a business replying to a
   * customer within a customer service window.
   *
   * @since 4.2.0
   */
  service = "service",

  /**
   * Indicates a free entry point conversation.
   *
   * @since 4.2.0
   */
  referral_conversation = "referral_conversation",
}

/**
 * Event Notification Status Conversation.
 *
 * @since 4.2.0
 * @see {@link https://developers.facebook.com/docs/whatsapp/pricing#conversations}
 */
export default interface EventNotificationStatusConversation {
  /**
   * Represents the ID of the conversation the given status notification
   * belongs to.
   *
   * @since 4.2.0
   */
  id: string;

  /**
   * Date when the conversation expires. This field is only present for
   * messages with a `status` set to `sent`.
   *
   * @since 4.2.0
   */
  expiration_timestamp?: number;

  /**
   * Describes conversation category
   *
   * @since 4.2.0
   */
  origin: {
    /**
     * Indicates conversation category. This can also be referred to as a
     * conversation entry point.
     *
     * @since 4.2.0
     */
    type:
      | EventNotificationStatusConversationType
      | (string & NonNullable<unknown>);
  };
}

export interface EventNotificationStatusPricing {
  /**
   * Indicates the conversation category.
   *
   * @since 4.2.0
   */
  category:
    | EventNotificationStatusConversationType
    | (string & NonNullable<unknown>);

  /**
   * Type of pricing model used by the business.
   *
   * @since 4.2.0
   */
  pricing_model: "CBP" | (string & NonNullable<unknown>);

  /**
   * Indicates if the given message or conversation is billable. Default is
   * true for all conversations, including those inside your free tier limit,
   * except those initiated from free entry points. Free entry point
   * conversation are not billable, false. You will not be charged for free
   * tier limit conversations, but they are considered billable and will be
   * reflected on your invoice.
   *
   * @since 4.2.0
   * @deprecated
   */
  billable: boolean;
}

/**
 * Event Notification Status.
 * The statuses object is nested within the value object and is triggered when
 * a message is sent or delivered to a customer or the customer reads the
 * delivered message sent by a business that is subscribed to the Webhooks.
 *
 * @since 4.2.0
 * @see {@link https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components#statuses-object}
 */
export default interface EventNotificationStatus {
  /**
   * The ID for the message that the business that is subscribed to the
   * webhooks sent to a customer.
   *
   * @since 4.2.0
   */
  id: MessageID;

  /**
   * The customer's WhatsApp ID. A business can respond to a customer using
   * this ID. This ID may not match the customer's phone number, which is
   * returned by the API as input when sending a message to the customer.
   *
   * @since 4.2.0
   */
  recipient_id: AccountID;

  /**
   * For a status to be read, it must have been delivered. In some scenarios,
   * such as when a user is in the chat screen and a message arrives, the
   * message is delivered and read almost simultaneously. In this or other
   * similar scenarios, the delivered notification will not be sent back, as it
   * is implied that a message has been delivered if it has been read. The
   * reason for this behavior is internal optimization.
   *
   * @since 4.2.0
   */
  status: EventNotificationStatusReason;

  /**
   * Date for the status message.
   *
   * @since 4.2.0
   */
  timestamp: number;

  /**
   * An object containing pricing information.
   *
   * @since 4.2.0
   */
  pricing: EventNotificationStatusPricing;

  /**
   * Information about the conversation.
   *
   * @since 4.2.0
   */
  conversation: EventNotificationStatusConversation;

  /**
   * Arbitrary string included in sent message.
   *
   * @since 4.2.0, Graph API November 14, 2023
   */
  biz_opaque_callback_data?: string;
}
