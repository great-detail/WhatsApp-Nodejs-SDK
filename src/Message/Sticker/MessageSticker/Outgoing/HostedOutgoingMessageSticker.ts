/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedOutgoingMessageMedia from "../../../MessageMedia/HostedOutgoingMessageMedia.js";
import OutgoingMessageSticker from "./OutgoingMessageSticker.js";

export default interface HostedOutgoingMessageSticker
  extends HostedOutgoingMessageMedia,
    OutgoingMessageSticker {}
