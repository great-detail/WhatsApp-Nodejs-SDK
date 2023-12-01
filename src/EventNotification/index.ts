/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import EventNotificationError from "../Error/EventNotificationError";
import { AccountID } from "../ID";
import CloudIncomingTextMessage from "../Message/TextMessage/CloudIncomingTextMessage";
import EventNotificationContact from "./EventNotificationContact";
import EventNotificationMetadata from "./EventNotificationMetadata";
import EventNotificationStatus from "./EventNotificationStatus";

export type EventNotificationChangeValueMessage = CloudIncomingTextMessage;

export interface EventNotificationChange {
  /**
   * Notification type. Value will be messages.
   *
   * @since 4.2.0
   */
  field: "messages" | (string & NonNullable<unknown>);

  /**
   * A value object.
   *
   * @since 4.2.0
   */
  value: {
    /**
     * Array of contact objects with information for the customer who sent a
     * message to the business.
     *
     * @since 4.2.0
     */
    contacts: EventNotificationContact[];

    /**
     * An array of error objects describing the error.
     *
     * @since 4.2.0
     */
    errors: EventNotificationError[];

    /**
     * Product used to send the message. Value is always whatsapp.
     *
     * @default 'whatsapp'
     */
    messaging_product: "whatsapp";

    /**
     * Information about a message received by the business that is subscribed to
     * the webhook.
     *
     * @since 4.2.0
     */
    messages?: EventNotificationChangeValueMessage[];

    /**
     * A metadata object describing the business subscribed to the webhook.
     *
     * @since 4.2.0
     */
    metadata: EventNotificationMetadata;

    /**
     * Status object for a message that was sent by the business that is
     * subscribed to the webhook.
     *
     * @since 4.2.0
     */
    statuses?: EventNotificationStatus[];
  };
}

export interface EventNotificationEntry {
  /**
   * The WhatsApp Business Account ID for the business that is subscribed to
   * the webhook.
   *
   * @since 4.2.0
   */
  id: AccountID;

  /**
   * An array of change objects.
   *
   * @since 4.2.0
   */
  changes: EventNotificationChange[];
}

export interface EventNotificationType {
  /**
   * The specific webhook a business is subscribed to. The webhook is
   * whatsapp_business_account.
   *
   * @since 4.2.0
   */
  object: string;

  /**
   * An array of entry objects.
   *
   * @since 4.2.0
   */
  entry: EventNotificationEntry[];
}
