/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudOutgoingMessageTemplate from "../MessageTemplate/CloudOutgoingMessageTemplate";
import MessageTypeEnum from "../MessageTypeEnum";
import CloudOutgoingMessage from "../OutgoingMessage/CloudOutgoingMessage";

type CloudOutgoingTemplateMessage =
  CloudOutgoingMessage<MessageTypeEnum.Template> & {
    [MessageTypeEnum.Template]: CloudOutgoingMessageTemplate;
  };

export default CloudOutgoingTemplateMessage;
