/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import OutgoingMessageType from "../../MessageType/OutgoingMessageType.js";
import CloudOutgoingMessage from "../../OutgoingMessage/CloudOutgoingMessage.js";
import CloudOutgoingMessageInteractive from "../MessageInteractive/Outgoing/CloudOutgoingMessageInteractive.js";

type CloudOutgoingInteractiveMessage =
  CloudOutgoingMessage<OutgoingMessageType.Interactive> & {
    [OutgoingMessageType.Interactive]: CloudOutgoingMessageInteractive;
  };

export default CloudOutgoingInteractiveMessage;
