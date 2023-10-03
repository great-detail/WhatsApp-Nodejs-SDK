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
