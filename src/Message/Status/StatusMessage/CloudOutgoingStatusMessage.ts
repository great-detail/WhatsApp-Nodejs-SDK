/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import CloudOutgoingMessageStatus from "../MessageStatus/Outgoing/CloudOutgoingMessageStatus.js";

type CloudOutgoingStatusMessage = {
  /**
   * Messaging service used for the request. Use "whatsapp".
   *
   * @default 'whatsapp'
   */
  messaging_product: "whatsapp";
} & CloudOutgoingMessageStatus;

export default CloudOutgoingStatusMessage;
