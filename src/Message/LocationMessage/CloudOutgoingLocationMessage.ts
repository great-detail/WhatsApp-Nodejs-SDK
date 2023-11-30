/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudOutgoingMessageLocation from "../MessageLocation/CloudOutgoingMessageLocation";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";
import CloudOutgoingMessage from "../OutgoingMessage/CloudOutgoingMessage";

type CloudOutgoingLocationMessage =
  CloudOutgoingMessage<OutgoingMessageType.Location> & {
    [OutgoingMessageType.Location]: CloudOutgoingMessageLocation;
  };

export default CloudOutgoingLocationMessage;
