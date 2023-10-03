import MessageTypesEnum from "./Message/MessageTypesEnum";
import WhatsAppAPI from "./WhatsAppAPI";

const instance = new WhatsAppAPI();
instance.message.createMessage(
  MessageTypesEnum.Text,
  {
    body: "hello",
  },
  "12345",
);

export default WhatsAppAPI;
export type { MessageTypesEnum };
