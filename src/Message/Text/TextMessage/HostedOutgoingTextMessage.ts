/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import OutgoingMessageType from "../../MessageType/OutgoingMessageType.js";
import HostedOutgoingMessage from "../../OutgoingMessage/CloudOutgoingMessage.js";
import HostedOutgoingMessageText from "../MessageText/Outgoing/HostedOutgoingMessageText.js";

type CloudOutgoingTextMessage =
  HostedOutgoingMessage<OutgoingMessageType.Text> & {
    [OutgoingMessageType.Text]: HostedOutgoingMessageText;

    /**
     * Allows for URL previews in text messages.
     *
     * @default false
     */
    preview_url?: boolean;
  };

export default CloudOutgoingTextMessage;
