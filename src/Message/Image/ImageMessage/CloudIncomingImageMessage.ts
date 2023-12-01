/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudIncomingMessage from "../../IncomingMessage/CloudIncomingMessage";
import IncomingMessageType from "../../MessageType/IncomingMessageType";
import CloudIncomingMessageImage from "../MessageImage/CloudIncomingMessageImage";

type CloudIncomingImageMessage =
  CloudIncomingMessage<IncomingMessageType.Image> & {
    [IncomingMessageType.Image]: CloudIncomingMessageImage;
  };

export default CloudIncomingImageMessage;
