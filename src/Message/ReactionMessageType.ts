import MessageRequestBodyType from "./MessageType";
import MessageTypesEnum from "./MessageTypesEnum";

export interface ReactionObjectMessageType {
  message_id: string;
  emoji: string;
}

type ReactionMessageType = MessageRequestBodyType<MessageTypesEnum.Reaction> & {
  [MessageTypesEnum.Reaction]: [ReactionObjectMessageType];
};
export default ReactionMessageType;
