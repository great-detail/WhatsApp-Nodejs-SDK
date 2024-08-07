/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import MessageText from "../index.js";

/**
 * Outgoing Text Message.
 *
 * @since 4.2.0
 */
export default interface CloudOutgoingMessageText extends MessageText {
  preview_url?: boolean;
}
