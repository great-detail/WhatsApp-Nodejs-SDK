/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { AccountID, MessageID } from "../../ID.js";
import OutgoingMessageType from "../MessageType/OutgoingMessageType.js";
import OutgoingMessage from "./index.js";

export type CloudOutgoingMessageResponseMessagesMessageStatus =
  | "accepted"
  | "held_for_quality_assessment";

export interface CloudOutgoingMessageResponse {
  /**
   * Messaging service used for the request. Use "whatsapp".
   *
   * @default 'whatsapp'
   */
  messaging_product: "whatsapp";

  // TODO: Reuse this
  contacts: {
    input: string;
    wa_id: AccountID;
  }[];
  messages: {
    id: MessageID;

    /**
     * Message Pacing & Quality Control Status.
     *
     * @since August 28, 2023
     * @todo determine whether this field will **always** be defined.
     */
    message_status?: CloudOutgoingMessageResponseMessagesMessageStatus;
  }[];
}

export interface CloudOutgoingMessageContext {
  /**
   * The ID of a previous message you are replying to.
   *
   * @since July 21, 2022
   */
  message_id: MessageID;
}

/**
 * Base Cloud Outgoing Message.
 *
 * @since 4.2.0
 */
export default interface CloudOutgoingMessage<
  MessageType extends OutgoingMessageType,
> extends OutgoingMessage<MessageType> {
  /**
   * Messaging service used for the request. Use "whatsapp".
   *
   * @default 'whatsapp'
   */
  messaging_product: "whatsapp";

  /**
   * Required if replying to any message in the conversation.
   */
  context?: CloudOutgoingMessageContext;

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
}
