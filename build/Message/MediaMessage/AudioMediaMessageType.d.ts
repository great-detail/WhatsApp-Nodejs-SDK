import MessageRequestBodyType from "../MessageType";
import MessageTypesEnum from "../MessageTypesEnum";
interface CloudAudioObjectMediaMessageType {
    id: string;
    link?: never;
}
interface HostedAudioObjectMediaMessageType {
    id?: never;
    link: string;
}
export type AudioObjectMediaMessageType = CloudAudioObjectMediaMessageType | HostedAudioObjectMediaMessageType;
type AudioMediaMessageType = MessageRequestBodyType<MessageTypesEnum.Audio> & {
    [MessageTypesEnum.Audio]: [AudioObjectMediaMessageType];
};
export default AudioMediaMessageType;
