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
import HostedOutgoingMessageLocation from "../MessageLocation/Outgoing/HostedOutgoingMessageLocation.js";

type HostedOutgoingLocationMessage =
  HostedOutgoingMessage<OutgoingMessageType.Location> & {
    [OutgoingMessageType.Location]: HostedOutgoingMessageLocation;
  };

export default HostedOutgoingLocationMessage;
