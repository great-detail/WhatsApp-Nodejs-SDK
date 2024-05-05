/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import CloudIncomingMessage from "../../IncomingMessage/CloudIncomingMessage.js";
import IncomingMessageType from "../../MessageType/IncomingMessageType.js";
import CloudIncomingMessageText from "../MessageText/Incoming/CloudIncomingMessageText.js";

type CloudIncomingTextMessage =
  CloudIncomingMessage<IncomingMessageType.Text> & {
    /**
     * When messages type is set to text, this object is included.
     *
     * @since 5.0.0
     */
    [IncomingMessageType.Text]: CloudIncomingMessageText;
  };

export default CloudIncomingTextMessage;
