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
import CloudIncomingMessageDocument from "../MessageDocument/Incoming/CloudIncomingMessageDocument";

type CloudIncomingDocumentMessage =
  CloudIncomingMessage<IncomingMessageType.Document> & {
    /**
     * A document object. When messages type is set to document, this object is
     * included in the messages object.
     *
     * @since 5.0.0
     */
    [IncomingMessageType.Document]: CloudIncomingMessageDocument;
  };

export default CloudIncomingDocumentMessage;
