import MessageRequestBodyType from "./MessageType";
import MessageTypesEnum from "./MessageTypesEnum";

export interface TextObjectMessageType {
  body: string;
  preview_url?: boolean;
}

type TextMessageType = MessageRequestBodyType<MessageTypesEnum.Text> & {
  [MessageTypesEnum.Text]: [TextObjectMessageType];
};
export default TextMessageType;
