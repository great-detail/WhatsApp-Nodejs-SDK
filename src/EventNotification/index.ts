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
import {
  RequestBodyType,
  WhatsAppMessageType,
} from "../OldMessageType/MessageType";
import EventNotificationStatus from "./EventNotificationStatus";
import AudioMediaEventNotificationMessage from "./MediaMessage/AudioMediaEventNotificationMessage";
import SystemEventNotificationMessage from "./SystemEventNotificationMessage";

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

type EventNotificationMessage =
  | AudioMediaEventNotificationMessage
  | SystemEventNotificationMessage;

export type EventNotificationChangeValue = WhatsAppMessageType & {
  metadata: EventNotificationMetadata;
  statuses?: EventNotificationStatus[];

  contacts: EventNotificationContact[];
  messages?: EventNotificationMessage[];

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

export type EventNotificationType = RequestBodyType & {
  object: string;
  entry: EventNotificationEntry[];
};
