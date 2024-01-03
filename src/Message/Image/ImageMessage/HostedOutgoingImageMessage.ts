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
import HostedOutgoingMessageImage from "../MessageImage/Outgoing/HostedOutgoingMessageImage.js";

type HostedOutgoingImageMessage =
  HostedOutgoingMessage<OutgoingMessageType.Image> & {
    [OutgoingMessageType.Image]: HostedOutgoingMessageImage;
  };

export default HostedOutgoingImageMessage;
