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

interface CloudAudioObjectMediaMessageType {
  id: string;
  link?: never;
}

interface HostedAudioObjectMediaMessageType {
  id?: never;
  link: string;
}

export type AudioObjectMediaMessageType =
  | CloudAudioObjectMediaMessageType
  | HostedAudioObjectMediaMessageType;

type AudioMediaMessageType = MessageRequestBodyType<MessageTypesEnum.Audio> & {
  [MessageTypesEnum.Audio]: [AudioObjectMediaMessageType];
};
export default AudioMediaMessageType;
