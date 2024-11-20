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
import { CreateMessageContact } from "./MessageContact.js";
import { CreateMessageLocation } from "./MessageLocation.js";
import { CreateMessageMedia } from "./MessageMedia.js";
import { CreateMessageText } from "./MessageText.js";

/**
 * WhatsApp Message ID.
 * This ID likely starts with `wamid.`.
 */
export type MessageID = `wamid.${string}` | (string & NonNullable<unknown>);

export type MessageStatusType =
  | "read"
  | (string & NonNullable<unknown>);

export type MessageRecipientType =
  | "individual"
  | "group"
  | (string & NonNullable<unknown>);

export enum MessageType {
  Audio = "audio", // for audio messages.
  Contacts = "contacts", // for contact messages.
  Document = "document", // for document messages.
  Image = "image", // for image messages.
  Interactive = "interactive", // for list and reply button messages.
  Location = "location", // for location messages.
  Reaction = "sticker", // for reaction messages.
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  Sticker = "sticker", // for sticker messages.

  /**
   * Not supported for Outgoing Messages.
   */
  System = "system",

  /**
   * Not supported for Outgoing Messages.
   */
  Button = "button",

  /**
   * Not supported for Outgoing Messages.
   */
  Order = "order",

  Template = "template", // for template messages. Text and media (images and documents) message templates are supported.
  Text = "text", // for text messages.
  Video = "video", // for video messages
}

export type CreateMessageOptions =  {
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
} & ({
  type: MessageType.Audio;
  [MessageType.Audio]: Omit<CreateMessageMedia, "caption">;
} | {
  type: MessageType.Contacts;
  [MessageType.Contacts]: CreateMessageContact[];
} | {
  type: MessageType.Document;
  [MessageType.Document]: CreateMessageMedia;
} | {
  type: MessageType.Image;
  [MessageType.Image]: CreateMessageMedia;
} | {
  type: MessageType.Interactive;
  // TODO: Implement this type
  [MessageType.Interactive]: unknown;
} | {
  type: MessageType.Location;
  [MessageType.Location]: CreateMessageLocation;
} | {
  type: MessageType.Reaction;
  [MessageType.Reaction]: Omit<CreateMessageMedia, "caption">;
} | {
  type: MessageType.Sticker;
  [MessageType.Sticker]: Omit<CreateMessageMedia, "caption">;
} | {
  type: MessageType.Template;
  // TODO: Implement this type
  [MessageType.Template]: unknown;
} | {
  type: MessageType.Text;
  [MessageType.Text]: CreateMessageText;
} | {
  type: MessageType.Video;
  [MessageType.Video]: CreateMessageMedia;
} | {
  type: (string & NonNullable<unknown>);
});

export type CreateMessagePayload = {
  messaging_product: "whatsapp";
  contacts: {
    input: PhoneNumberString;
    wa_id: AccountID;
  }[];
  messages: {
    id: MessageID;
    message_status:
      | "accepted"
      | "held_for_quality_assessment"
  }[];
  error: WhatsappError;
};
