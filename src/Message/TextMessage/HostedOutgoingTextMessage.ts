/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageText from "../MessageText/HostedOutgoingMessageText";
import MessageTypeEnum from "../MessageTypeEnum";
import HostedOutgoingMessage from "../OutgoingMessage/CloudOutgoingMessage";

type CloudOutgoingTextMessage = HostedOutgoingMessage<MessageTypeEnum.Text> & {
  [MessageTypeEnum.Text]: HostedOutgoingMessageText;

  /**
   * Allows for URL previews in text messages.
   *
   * @default false
   */
  preview_url?: boolean;
};

export default CloudOutgoingTextMessage;
