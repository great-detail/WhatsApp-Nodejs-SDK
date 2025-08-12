/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { AccountID } from "../Account.js";
import { WhatsappError } from "../Error.js";
import { PhoneNumberID, PhoneNumberString } from "../PhoneNumber.js";
import { EventNotificationMessageButton } from "./MessageButton.js";
import { CreateMessageContact } from "./MessageContact.js";
import { CreateMessageLocation } from "./MessageLocation.js";
import {
  CreateMessageMedia,
  EventNotificationMessageMedia,
} from "./MessageMedia.js";
import { EventNotificationMessageSystem } from "./MessageSystem.js";
import { CreateMessageTemplate } from "./MessageTemplate.js";
import {
  CreateMessageText,
  EventNotificationMessageText,
} from "./MessageText.js";
import { MessageType } from "./MessageType.js";

/**
 * WhatsApp Message ID.
 * This ID likely starts with `wamid.`.
 */
export type MessageID = `wamid.${string}` | (string & NonNullable<unknown>);

export type MessageStatusType = "read" | (string & NonNullable<unknown>);

export type MessageRecipientType =
  | "individual"
  | "group"
  | (string & NonNullable<unknown>);

export type CreateMessageMessageBase<T extends string, O> = {
  type: T;
} & {
  [K in T]: O;
};

export type CreateMessageOptions = {
  phoneNumberID: PhoneNumberID;

  /**
   * WhatsApp ID or phone number of the customer you want to send a message to.
   */
  to: PhoneNumberID | PhoneNumberString;

  /**
   * Currently, you can only send messages to individuals.
   *
   * @default "individual"
   * @see {@link https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account-to-number-current-status/messages/#parameters}
   */
  recipientType?: MessageRecipientType;

  /**
   * Required if replying to any message in the conversation.
   */
  context?: {
    inReplyTo: MessageID;
  };

  /**
   * An arbitrary 256B string, useful for tracking. For example, you could pass
   * the message template ID in this field to track your customer's journey
   * starting from the first message you send. You could then track the ROI of
   * different message template types to determine the most effective one.
   *
   * Any app subscribed to the messages webhook field on the WhatsApp Business
   * Account can get this string, as it is included in statuses object within
   * webhook payloads.
   *
   * Cloud API does not process this field, it just returns it as part of
   * sent/delivered/read message webhooks.
   *
   * @since November 14, 2023
   */
  biz_opaque_callback_data?: string;
  [key: string]: unknown | undefined;
} & (
  | CreateMessageMessageBase<
      MessageType.Audio,
      Omit<CreateMessageMedia, "caption">
    >
  | CreateMessageMessageBase<MessageType.Contacts, CreateMessageContact[]>
  | CreateMessageMessageBase<MessageType.Document, CreateMessageMedia>
  | CreateMessageMessageBase<MessageType.Image, CreateMessageMedia>
  | CreateMessageMessageBase<MessageType.Interactive, unknown> // TODO: Implement this type
  | CreateMessageMessageBase<MessageType.Location, CreateMessageLocation>
  | CreateMessageMessageBase<
      MessageType.Reaction,
      Omit<CreateMessageMedia, "caption">
    >
  | CreateMessageMessageBase<
      MessageType.Sticker,
      Omit<CreateMessageMedia, "caption">
    >
  | CreateMessageMessageBase<MessageType.Template, CreateMessageTemplate>
  | CreateMessageMessageBase<MessageType.Text, CreateMessageText>
  | CreateMessageMessageBase<MessageType.Video, CreateMessageMedia>
  | { type: string & NonNullable<unknown> }
);

export type CreateMessagePayload = {
  messaging_product: "whatsapp";
  contacts: {
    input: PhoneNumberString;
    wa_id: AccountID;
  }[];
  messages: {
    id: MessageID;
    message_status: "accepted" | "held_for_quality_assessment";
  }[];
  error: WhatsappError;
};

export type EventNotificationMessageMessageBase<T extends string, O> = {
  type: T;
} & {
  [K in T]: O;
};

export type EventNotificationMessageMessage =
  | EventNotificationMessageMessageBase<
      MessageType.Audio,
      Omit<EventNotificationMessageMedia, "caption" | "filename" | "sha256">
    >
  | EventNotificationMessageMessageBase<
      MessageType.Button,
      EventNotificationMessageButton
    >
  | EventNotificationMessageMessageBase<
      MessageType.Contacts,
      unknown // TODO: Add this type
    >
  | EventNotificationMessageMessageBase<
      MessageType.Document,
      EventNotificationMessageMedia
    >
  | EventNotificationMessageMessageBase<
      MessageType.Image,
      EventNotificationMessageMedia
    >
  | EventNotificationMessageMessageBase<
      MessageType.Interactive,
      unknown // TODO: Implement this type
    >
  | EventNotificationMessageMessageBase<
      MessageType.Order,
      unknown // TODO: Implement this type
    >
  | EventNotificationMessageMessageBase<
      MessageType.Location,
      unknown // TODO: Implement this type
    >
  | EventNotificationMessageMessageBase<
      MessageType.Reaction,
      Omit<EventNotificationMessageMedia, "caption" | "filename"> & {
        animated: boolean;
      }
    >
  | EventNotificationMessageMessageBase<
      MessageType.Sticker,
      Omit<EventNotificationMessageMedia, "caption" | "filename"> & {
        animated: boolean;
      }
    >
  | EventNotificationMessageMessageBase<
      MessageType.Text,
      EventNotificationMessageText
    >
  | EventNotificationMessageMessageBase<
      MessageType.Video,
      Omit<EventNotificationMessageMedia, "filename">
    >
  | EventNotificationMessageMessageBase<
      MessageType.System,
      EventNotificationMessageSystem
    >;
