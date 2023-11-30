/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudOutgoingMessageInteractive from "../MessageInteractive/CloudOutgoingMessageInteractive";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";
import CloudOutgoingMessage from "../OutgoingMessage/CloudOutgoingMessage";

type CloudOutgoingInteractiveMessage =
  CloudOutgoingMessage<OutgoingMessageType.Interactive> & {
    [OutgoingMessageType.Interactive]: CloudOutgoingMessageInteractive;
  };

export default CloudOutgoingInteractiveMessage;
