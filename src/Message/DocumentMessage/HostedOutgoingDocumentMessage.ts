/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageDocument from "../MessageDocument/HostedOutgoingMessageDocument";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";
import HostedOutgoingMessage from "../OutgoingMessage/HostedOutgoingMessage";

type HostedOutgoingDocumentMessage =
  HostedOutgoingMessage<OutgoingMessageType.Document> & {
    [OutgoingMessageType.Document]: HostedOutgoingMessageDocument;
  };

export default HostedOutgoingDocumentMessage;
