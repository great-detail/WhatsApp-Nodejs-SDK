import MessageRequestBodyType from "../MessageType";
import MessageTypesEnum from "../MessageTypesEnum";
interface CloudVideoObjectMediaMessageType {
    id: string;
    link?: never;
    caption?: string;
}
interface HostedVideoObjectMediaMessageType {
    id?: never;
    link: string;
    caption?: string;
}
export type VideoObjectMediaMessageType = CloudVideoObjectMediaMessageType | HostedVideoObjectMediaMessageType;
type VideoMessageType = MessageRequestBodyType<MessageTypesEnum.Video> & {
    [MessageTypesEnum.Video]: [VideoObjectMediaMessageType];
};
export default VideoMessageType;
