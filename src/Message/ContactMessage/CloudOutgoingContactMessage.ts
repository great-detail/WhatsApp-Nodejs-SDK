/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudOutgoingMessageContact from "../MessageContact/CloudOutgoingMessageContact";
import MessageTypeEnum from "../MessageTypeEnum";
import CloudOutgoingMessage from "../OutgoingMessage/CloudOutgoingMessage";

type CloudOutgoingContactMessage =
  CloudOutgoingMessage<MessageTypeEnum.Contacts> & {
    /**
     * A contacts object.
     *
     * @since 4.2.0
     */
    [MessageTypeEnum.Contacts]: CloudOutgoingMessageContact[];
  };

export default CloudOutgoingContactMessage;
