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

export interface TextObjectMessageType {
  body: string;
  preview_url?: boolean;
}

type TextMessageType = MessageRequestBodyType<MessageTypesEnum.Text> & {
  [MessageTypesEnum.Text]: [TextObjectMessageType];
};
export default TextMessageType;
