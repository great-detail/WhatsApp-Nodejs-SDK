import MessageTypesEnum from "./MessageTypesEnum";

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
  message_id: string;
};

type MessageType<T extends MessageTypesEnum> = WhatsAppMessageType & {
  type?: T;
  to: string;
  recipient_type?: string;
  context?: MessageRequestContext;
};

export default MessageType;
