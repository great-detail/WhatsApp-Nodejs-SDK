/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import OutgoingMessageType from "../../MessageType/OutgoingMessageType";
import HostedOutgoingMessage from "../../OutgoingMessage/HostedOutgoingMessage";
import HostedOutgoingMessageContact from "../MessageContact/HostedOutgoingMessageContact";

type HostedOutgoingContactMessage =
  HostedOutgoingMessage<OutgoingMessageType.Contacts> & {
    /**
     * A contacts object.
     *
     * @since 4.2.0
     */
    [OutgoingMessageType.Contacts]: HostedOutgoingMessageContact[];
  };

export default HostedOutgoingContactMessage;