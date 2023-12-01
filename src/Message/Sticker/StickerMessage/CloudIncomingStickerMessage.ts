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
import CloudIncomingMessageSticker from "../MessageSticker/Incoming/CloudIncomingMessageSticker";

type CloudIncomingStickerMessage =
  CloudIncomingMessage<IncomingMessageType.Sticker> & {
    /**
     * When messages type is set to sticker, this object is included in the
     * messages object.
     *
     * @since 5.0.0
     */
    [IncomingMessageType.Sticker]: CloudIncomingMessageSticker;
  };

export default CloudIncomingStickerMessage;
