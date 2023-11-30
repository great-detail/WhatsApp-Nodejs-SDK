/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import IncomingMessage from ".";
import IncomingMessageType from "../MessageType/IncomingMessageType";

export default interface CloudIncomingMessage<
  MessageType extends IncomingMessageType,
> extends IncomingMessage<MessageType> {}
