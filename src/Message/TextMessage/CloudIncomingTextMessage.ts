/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import CloudIncomingMessage from "../IncomingMessage/CloudIncomingMessage";
import CloudIncomingMessageText from "../MessageText/CloudIncomingMessageText";
import IncomingMessageType from "../MessageType/IncomingMessageType";

type CloudIncomingTextMessage =
  CloudIncomingMessage<IncomingMessageType.Text> & {
    [IncomingMessageType.Text]: CloudIncomingMessageText;
  };

export default CloudIncomingTextMessage;
