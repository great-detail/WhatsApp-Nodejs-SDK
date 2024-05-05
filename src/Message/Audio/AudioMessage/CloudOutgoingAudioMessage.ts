/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import OutgoingMessageType from "../../MessageType/OutgoingMessageType.js";
import CloudOutgoingMessage from "../../OutgoingMessage/CloudOutgoingMessage.js";
import CloudOutgoingMessageAudio from "../MessageAudio/CloudOutgoingMessageAudio.js";

type CloudOutgoingAudioMessage =
  CloudOutgoingMessage<OutgoingMessageType.Audio> & {
    [OutgoingMessageType.Audio]: CloudOutgoingMessageAudio;
  };

export default CloudOutgoingAudioMessage;
