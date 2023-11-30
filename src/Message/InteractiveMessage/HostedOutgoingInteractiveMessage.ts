/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageInteractive from "../MessageInteractive/HostedOutgoingMessageInteractive";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";
import HostedOutgoingMessage from "../OutgoingMessage/HostedOutgoingMessage";

type HostedOutgoingInteractiveMessage =
  HostedOutgoingMessage<OutgoingMessageType.Interactive> & {
    [OutgoingMessageType.Interactive]: HostedOutgoingMessageInteractive;
  };

export default HostedOutgoingInteractiveMessage;
