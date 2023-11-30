/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageMedia from "../MessageMedia/HostedOutgoingMessageMedia";
import MessageTypeEnum from "../MessageTypeEnum";
import HostedOutgoingMessage from "../OutgoingMessage/HostedOutgoingMessage";

type HostedOutgoingImageMessage =
  HostedOutgoingMessage<MessageTypeEnum.Image> & {
    [MessageTypeEnum.Image]: HostedOutgoingMessageMedia;
  };

export default HostedOutgoingImageMessage;
