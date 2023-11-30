/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import OutgoingMessage from ".";
import { AccountID, MessageID } from "../../ID";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";

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
  }[];
}

export interface CloudOutgoingMessageContext {
  /**
   * The ID of a previous message you are replying to.
   *
   * @since 4.2.0
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
   *
   * @since 4.2.0
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
   * @since 4.2.0
   */
  biz_opaque_callback_data?: string;
}
