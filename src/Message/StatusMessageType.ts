import { WhatsAppMessageType } from "./MessageType";

export type StatusObjectMessageType = {
  status: "read";
  message_id: string;
};

type StatusMessageType = WhatsAppMessageType & StatusObjectMessageType;
export default StatusMessageType;
