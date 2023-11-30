/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { WhatsAppAccountID } from "../API/AbstractAPI";
import { EventNotificationError } from "../Error";
import EventNotificationStatus from "./EventNotificationStatus";

export type WhatsAppPhoneNumberID = string;

export type EventNotificationMetadata = {
  display_phone_number: string;
  phone_number_id: WhatsAppPhoneNumberID;
};

export type EventNotificationContact = {
  wa_id: WhatsAppAccountID;
  profile: {
    name: string;
  };
};

export type EventNotificationChangeValue = {
  /**
   * Messaging service used for the request. Use "whatsapp".
   *
   * @default 'whatsapp'
   */
  messaging_product: "whatsapp";

  metadata: EventNotificationMetadata;
  statuses?: EventNotificationStatus[];

  contacts: EventNotificationContact[];
  messages?: unknown[];

  /**
   * An array of error objects describing the error.
   *
   * @since 4.2.0
   */
  errors: EventNotificationError[];
};

export type EventNotificationChange = {
  value: EventNotificationChangeValue;

  // See: https://github.com/MarcosNicolau/whatsapp-business-sdk/blob/7847e8dc103484442ff20444723228ccab2203f1/src/types/utils.ts#L10
  field: "messages" | (string & NonNullable<unknown>);
};

export type EventNotificationEntry = {
  id: string;
  changes: EventNotificationChange[];
};

export type EventNotificationType = {
  object: string;
  entry: EventNotificationEntry[];
};
