/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { MessageID } from "../../../../ID.js";
import OutgoingMessageStatus from "../Outgoing/OutgoingMessageStatus.js";

export default interface CloudOutgoingMessageStatus
  extends OutgoingMessageStatus {
  message_id: MessageID;
}

export interface CloudOutgoingMessageStatusResponse {
  success?: boolean;
}
