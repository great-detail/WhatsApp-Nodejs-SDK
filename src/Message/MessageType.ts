/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import MessageTypesEnum from "./MessageTypesEnum";

export type MessageID = string;

export type RequestBodyType = Record<string, unknown>;
export type WhatsAppMessageType = RequestBodyType & {
  /**
   * The Meta messaging product name.
   *
   * @default 'whatsapp'
   */
  messaging_product: "whatsapp";
};

type MessageRequestContext = {
  message_id: MessageID;
};

type MessageType<T extends MessageTypesEnum> = WhatsAppMessageType & {
  type?: T;
  to: string;
  recipient_type?: string;
  context?: MessageRequestContext;
};

export default MessageType;
