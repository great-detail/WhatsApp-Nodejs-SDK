/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import OutgoingMessageType from "../../MessageType/OutgoingMessageType.js";
import HostedOutgoingMessage from "../../OutgoingMessage/HostedOutgoingMessage.js";
import HostedOutgoingMessageInteractive from "../MessageInteractive/Outgoing/HostedOutgoingMessageInteractive.js";

type HostedOutgoingInteractiveMessage =
  HostedOutgoingMessage<OutgoingMessageType.Interactive> & {
    [OutgoingMessageType.Interactive]: HostedOutgoingMessageInteractive;
  };

export default HostedOutgoingInteractiveMessage;
