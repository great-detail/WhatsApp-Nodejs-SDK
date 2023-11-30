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

type HostedOutgoingStickerMessage =
  HostedOutgoingMessage<OutgoingMessageType.Sticker> & {
    /**
     * A media object containing a sticker.
     *
     * Only static third-party outbound stickers are supported in addition to
     * all types of inbound stickers. A static sticker needs to be 512x512
     * pixels and cannot exceed 100 KB. Animated stickers are not supported.
     *
     * @since 4.2.0
     */
    [OutgoingMessageType.Sticker]: HostedOutgoingMessageMedia;
  };

export default HostedOutgoingStickerMessage;
