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

interface CloudImageObjectMediaMessageType {
  id: string;
  link?: never;
  caption?: string;
}

interface HostedImageObjectMediaMessageType {
  id?: never;
  link: string;
  caption?: string;
}

export type ImageObjectMediaMessageType =
  | CloudImageObjectMediaMessageType
  | HostedImageObjectMediaMessageType;

type ImageMediaMessageType = MessageRequestBodyType<MessageTypesEnum.Image> & {
  [MessageTypesEnum.Image]: [ImageObjectMediaMessageType];
};
export default ImageMediaMessageType;
