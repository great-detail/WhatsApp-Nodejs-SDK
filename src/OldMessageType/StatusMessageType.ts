/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { WhatsAppMessageType } from "./MessageType";

export type StatusObjectMessageType = {
  status: "read";
  message_id: string;
};

type StatusMessageType = WhatsAppMessageType & StatusObjectMessageType;
export default StatusMessageType;
