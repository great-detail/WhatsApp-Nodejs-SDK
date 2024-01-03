/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import IncomingMessageError from "../../Error/IncomingMessageError.js";
import { AccountID, MessageID } from "../../ID.js";
import CloudIncomingMessageContext from "../MessageContext/CloudIncomingMessageContext.js";
import CloudIncomingMessageIdentity from "../MessageIdentity/CloudIncomingMessageIdentity.js";
import CloudIncomingMessageReferral from "../MessageReferral/CloudIncomingMessageReferral.js";
import CloudIncomingMessageSystem from "../MessageSystem/CloudIncomingMessageSystem.js";
import IncomingMessageType from "../MessageType/IncomingMessageType.js";
import Message from "../index.js";

export default interface IncomingMessage<
  MessageType extends IncomingMessageType,
> extends Message {
  /**
   * The type of message that has been received by the business that has
   * subscribed to Webhooks.
   *
   * @since 4.2.0
   */
  type: MessageType;

  /**
   * The ID for the message that was received by the business. You could use
   * messages endpoint to mark this specific message as read.
   *
   * @since 4.2.0
   */
  id: MessageID;

  /**
   * Unix timestamp indicating when the WhatsApp server received the message
   * from the customer.
   *
   * @since 4.2.0
   */
  timestamp: string;

  /**
   * The customer's WhatsApp ID. A business can respond to a customer using
   * this ID. This ID may not match the customer's phone number, which is
   * returned by the API as input when sending a message to the customer.
   *
   * @since 4.2.0
   */
  from: AccountID;

  /**
   * When messages type is set to system, a customer has updated their phone
   * number or profile information, this object is included in the messages
   * object.
   *
   * @since 4.2.0
   */
  system?: CloudIncomingMessageSystem;

  /**
   * Context object. Only included when a user replies or interacts with one of
   * your messages.
   *
   * @since 4.2.0
   */
  context?: CloudIncomingMessageContext;

  /**
   * An array of error objects describing the error.
   *
   * @since 4.2.0
   */
  errors?: IncomingMessageError[];

  /**
   * An identity object. Webhook is triggered when a customer's phone number or
   * profile information has been updated.
   *
   * @since 4.2.0
   */
  identity: CloudIncomingMessageIdentity;

  /**
   * Referral object. When a customer clicks an ad that redirects to WhatsApp,
   * this object is included in the messages object.
   *
   * @since 4.2.0
   */
  referral: CloudIncomingMessageReferral;
}
