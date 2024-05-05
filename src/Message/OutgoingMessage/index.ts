/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { AccountID, PhoneNumber } from "../../ID.js";
import Message from "../index.js";
import OutgoingMessageType from "../MessageType/OutgoingMessageType.js";

export type OutgoingMessageRecipientType =
  | "individual"
  | "group"
  | (string & NonNullable<unknown>);

/**
 * Base Outgoing Message.
 *
 * @since 4.2.0
 */
export default interface OutgoingMessage<
  MessageType extends OutgoingMessageType,
> extends Message {
  /**
   * The type of message you want to send.
   *
   * @default OutgoingMessageType.Text
   */
  type?: MessageType;

  /**
   * WhatsApp ID or phone number of the customer you want to send a message to.
   */
  to: AccountID | PhoneNumber;

  /**
   * Currently, you can only send messages to individuals.
   *
   * @default "individual"
   * @see {@link https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account-to-number-current-status/messages/#parameters}
   */
  recipient_type?: OutgoingMessageRecipientType;
}
