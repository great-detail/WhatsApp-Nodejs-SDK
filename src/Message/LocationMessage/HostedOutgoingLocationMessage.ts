/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageLocation from "../MessageLocation/HostedOutgoingMessageLocation";
import MessageTypeEnum from "../MessageTypeEnum";
import HostedOutgoingMessage from "../OutgoingMessage/HostedOutgoingMessage";

type HostedOutgoingLocationMessage =
  HostedOutgoingMessage<MessageTypeEnum.Location> & {
    [MessageTypeEnum.Location]: HostedOutgoingMessageLocation;
  };

export default HostedOutgoingLocationMessage;
