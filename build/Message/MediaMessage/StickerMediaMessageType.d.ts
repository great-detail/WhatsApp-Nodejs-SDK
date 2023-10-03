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
export type StickerObjectMediaMessageType = CloudStickerObjectMediaMessageType | HostedStickerObjectMediaMessageType;
type StickerMediaMessageType = MessageRequestBodyType<MessageTypesEnum.Sticker> & {
    [MessageTypesEnum.Sticker]: [StickerObjectMediaMessageType];
};
export default StickerMediaMessageType;
