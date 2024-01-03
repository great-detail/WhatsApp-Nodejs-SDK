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
import CloudIncomingMessageAudio from "../MessageAudio/CloudIncomingMessageAudio.js";

type CloudIncomingAudioMessage =
  CloudIncomingMessage<IncomingMessageType.Audio> & {
    /**
     * When the messages type is set to audio, including voice messages, this
     * object is included in the messages object.
     *
     * @since 5.0.0
     */
    [IncomingMessageType.Audio]: CloudIncomingMessageAudio;
  };

export default CloudIncomingAudioMessage;
