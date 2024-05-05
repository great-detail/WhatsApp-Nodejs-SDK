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
import CloudIncomingMessageImage from "../MessageImage/Incoming/CloudIncomingMessageImage.js";

type CloudIncomingImageMessage =
  CloudIncomingMessage<IncomingMessageType.Image> & {
    /**
     * When messages type is set to image, this object is included in the
     * messages object.
     *
     * @since 5.0.0
     */
    [IncomingMessageType.Image]: CloudIncomingMessageImage;
  };

export default CloudIncomingImageMessage;
