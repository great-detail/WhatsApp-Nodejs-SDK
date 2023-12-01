/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudOutgoingMessageImage from "../MessageImage/CloudOutgoingMessageImage";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";
import CloudOutgoingMessage from "../OutgoingMessage/CloudOutgoingMessage";

type CloudOutgoingImageMessage =
  CloudOutgoingMessage<OutgoingMessageType.Image> & {
    [OutgoingMessageType.Image]: CloudOutgoingMessageImage;
  };

export default CloudOutgoingImageMessage;
