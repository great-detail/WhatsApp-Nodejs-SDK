/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import HostedIncomingMessageMedia from "../../../MessageMedia/HostedIncomingMessageMedia";
import IncomingMessageSticker from "./IncomingMessageSticker";

export default interface HostedIncomingMessageSticker
  extends HostedIncomingMessageMedia,
    IncomingMessageSticker {}
