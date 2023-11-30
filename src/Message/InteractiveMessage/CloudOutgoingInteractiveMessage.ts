/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudOutgoingMessageInteractive from "../MessageInteractive/CloudOutgoingMessageInteractive";
import MessageTypeEnum from "../MessageTypeEnum";
import CloudOutgoingMessage from "../OutgoingMessage/CloudOutgoingMessage";

type CloudOutgoingInteractiveMessage =
  CloudOutgoingMessage<MessageTypeEnum.Interactive> & {
    [MessageTypeEnum.Interactive]: CloudOutgoingMessageInteractive;
  };

export default CloudOutgoingInteractiveMessage;
