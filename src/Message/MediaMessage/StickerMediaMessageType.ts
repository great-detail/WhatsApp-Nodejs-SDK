/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import MessageRequestBodyType from "../MessageType";
import MessageTypesEnum from "../MessageTypesEnum";

interface CloudStickerObjectMediaMessageType {
  id: string;
  link?: never;
}

interface HostedStickerObjectMediaMessageType {
  id?: never;
  link: string;
}

export type StickerObjectMediaMessageType =
  | CloudStickerObjectMediaMessageType
  | HostedStickerObjectMediaMessageType;

type StickerMediaMessageType =
  MessageRequestBodyType<MessageTypesEnum.Sticker> & {
    [MessageTypesEnum.Sticker]: [StickerObjectMediaMessageType];
  };
export default StickerMediaMessageType;
