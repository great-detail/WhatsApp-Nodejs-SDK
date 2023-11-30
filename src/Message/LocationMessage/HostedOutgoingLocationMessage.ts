/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageLocation from "../MessageLocation/HostedOutgoingMessageLocation";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";
import HostedOutgoingMessage from "../OutgoingMessage/HostedOutgoingMessage";

type HostedOutgoingLocationMessage =
  HostedOutgoingMessage<OutgoingMessageType.Location> & {
    [OutgoingMessageType.Location]: HostedOutgoingMessageLocation;
  };

export default HostedOutgoingLocationMessage;