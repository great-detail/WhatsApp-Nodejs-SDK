/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageContact from "../MessageContact/HostedOutgoingMessageContact";
import MessageTypeEnum from "../MessageTypeEnum";
import HostedOutgoingMessage from "../OutgoingMessage/HostedOutgoingMessage";

type HostedOutgoingContactMessage =
  HostedOutgoingMessage<MessageTypeEnum.Contacts> & {
    /**
     * A contacts object.
     *
     * @since 4.2.0
     */
    [MessageTypeEnum.Contacts]: HostedOutgoingMessageContact[];
  };

export default HostedOutgoingContactMessage;
