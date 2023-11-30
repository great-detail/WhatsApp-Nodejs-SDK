/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import Message, { AccountID, PhoneNumber } from "..";
import MessageTypeEnum from "../MessageTypeEnum";

export type OutgoingMessageRecipientType =
  | "individual"
  | (string & NonNullable<unknown>);

/**
 * Base Outgoing Message.
 *
 * @since 4.2.0
 */
export default interface OutgoingMessage<MessageType extends MessageTypeEnum>
  extends Message {
  /**
   * The type of message you want to send.
   *
   * @default MessageTypeEnum.Text
   */
  type?: MessageType;

  /**
   * WhatsApp ID or phone number of the customer you want to send a message to.
   *
   * @since 4.2.0
   */
  to: AccountID | PhoneNumber;

  /**
   * Currently, you can only send messages to individuals.
   *
   * @since 4.2.0
   * @default "individual"
   */
  recipient_type?: OutgoingMessageRecipientType;
}
