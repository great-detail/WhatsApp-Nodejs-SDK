import { WhatsAppMessageType } from "./MessageType";
type MessageResponseType = WhatsAppMessageType & {
    contacts: [
        {
            input: string;
            wa_id: string;
        }
    ];
    messages: [
        {
            id: string;
        }
    ];
};
export default MessageResponseType;
