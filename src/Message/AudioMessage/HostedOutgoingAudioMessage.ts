/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageMedia from "../MessageMedia/HostedOutgoingMessageMedia";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";
import HostedOutgoingMessage from "../OutgoingMessage/HostedOutgoingMessage";

type HostedOutgoingAudioMessage =
  HostedOutgoingMessage<OutgoingMessageType.Audio> & {
    [OutgoingMessageType.Audio]: HostedOutgoingMessageMedia;
  };

export default HostedOutgoingAudioMessage;
