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
import CloudIncomingMessageVideo from "../MessageVideo/CloudIncomingMessageVideo";

type CloudIncomingVideoMessage =
  CloudIncomingMessage<IncomingMessageType.Video> & {
    /**
     * When messages type is set to video, this object is included in messages
     * object.
     *
     * @since 5.0.0
     */
    [IncomingMessageType.Video]: CloudIncomingMessageVideo;
  };

export default CloudIncomingVideoMessage;
