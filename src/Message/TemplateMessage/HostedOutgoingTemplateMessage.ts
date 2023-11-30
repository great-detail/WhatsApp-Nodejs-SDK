/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageTemplate from "../MessageTemplate/HostedOutgoingMessageTemplate";
import MessageTypeEnum from "../MessageTypeEnum";
import HostedOutgoingMessage from "../OutgoingMessage/HostedOutgoingMessage";

type HostedOutgoingTemplateMessage =
  HostedOutgoingMessage<MessageTypeEnum.Template> & {
    [MessageTypeEnum.Template]: HostedOutgoingMessageTemplate;
  };

export default HostedOutgoingTemplateMessage;
