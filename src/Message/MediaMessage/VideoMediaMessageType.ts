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

export type VideoObjectMediaMessageType =
  | CloudVideoObjectMediaMessageType
  | HostedVideoObjectMediaMessageType;

type VideoMessageType = MessageRequestBodyType<MessageTypesEnum.Video> & {
  [MessageTypesEnum.Video]: [VideoObjectMediaMessageType];
};
export default VideoMessageType;
