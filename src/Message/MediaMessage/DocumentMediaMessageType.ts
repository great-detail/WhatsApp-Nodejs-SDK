import MessageRequestBodyType from "../MessageType";
import MessageTypesEnum from "../MessageTypesEnum";

interface CloudDocumentObjectMediaMessageType {
  id: string;
  link?: never;
  caption?: string;
  filename?: string;
}

interface HostedDocumentObjectMediaMessageType {
  id?: never;
  link: string;
  caption?: string;
  filename?: string;
}

export type DocumentObjectMediaMessageType =
  | CloudDocumentObjectMediaMessageType
  | HostedDocumentObjectMediaMessageType;

type DocumentMediaMessageType =
  MessageRequestBodyType<MessageTypesEnum.Document> & {
    [MessageTypesEnum.Document]: [DocumentObjectMediaMessageType];
  };
export default DocumentMediaMessageType;
