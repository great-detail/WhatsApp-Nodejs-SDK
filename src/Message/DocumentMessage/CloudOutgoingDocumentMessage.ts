/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudOutgoingMessageMedia from "../MessageMedia/CloudOutgoingMessageMedia";
import MessageTypeEnum from "../MessageTypeEnum";
import CloudOutgoingMessage from "../OutgoingMessage/CloudOutgoingMessage";

type CloudOutgoingDocumentMessage =
  CloudOutgoingMessage<MessageTypeEnum.Document> & {
    [MessageTypeEnum.Document]: CloudOutgoingMessageMedia;
  };

export default CloudOutgoingDocumentMessage;
