/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import CloudOutgoingMessageMedia from "../../../MessageMedia/CloudOutgoingMessageMedia.js";
import OutgoingMessageDocument from "./OutgoingMessageDocument.js";

export default interface CloudOutgoingMessageDocument
  extends CloudOutgoingMessageMedia,
    OutgoingMessageDocument {}
