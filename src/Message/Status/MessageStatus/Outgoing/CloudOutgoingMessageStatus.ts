/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import OutgoingMessageError from "../../../../Error/OutgoingMessageError.js";
import { MessageID } from "../../../../ID.js";
import OutgoingMessageStatus from "../Outgoing/OutgoingMessageStatus.js";

export default interface CloudOutgoingMessageStatus
  extends OutgoingMessageStatus {
  message_id: MessageID;
}

export interface CloudOutgoingMessageStatusResponse {
  success?: boolean;

  /**
   * @see {@link https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes}
   */
  error?: OutgoingMessageError;
}
