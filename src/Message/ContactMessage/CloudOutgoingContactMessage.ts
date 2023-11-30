/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudOutgoingMessageContact from "../MessageContact/CloudOutgoingMessageContact";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";
import CloudOutgoingMessage from "../OutgoingMessage/CloudOutgoingMessage";

type CloudOutgoingContactMessage =
  CloudOutgoingMessage<OutgoingMessageType.Contacts> & {
    /**
     * A contacts object.
     *
     * @since 4.2.0
     */
    [OutgoingMessageType.Contacts]: CloudOutgoingMessageContact[];
  };

export default CloudOutgoingContactMessage;
