/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageInteractive from "../MessageInteractive/HostedOutgoingMessageInteractive";
import MessageTypeEnum from "../MessageTypeEnum";
import HostedOutgoingMessage from "../OutgoingMessage/HostedOutgoingMessage";

type HostedOutgoingInteractiveMessage =
  HostedOutgoingMessage<MessageTypeEnum.Interactive> & {
    [MessageTypeEnum.Interactive]: HostedOutgoingMessageInteractive;
  };

export default HostedOutgoingInteractiveMessage;
