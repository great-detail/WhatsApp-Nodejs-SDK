/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
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
