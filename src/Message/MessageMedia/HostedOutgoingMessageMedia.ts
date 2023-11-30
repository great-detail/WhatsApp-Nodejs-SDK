/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import OutgoingMessageMedia from "./OutgoingMessageMedia";

export default interface HostedOutgoingMessageMedia
  extends OutgoingMessageMedia {
  /**
   * his path is optionally used with a link when the HTTP/HTTPS link is not
   * directly accessible and requires additional configurations like a bearer
   * token.
   *
   * @since 4.2.0
   * @see {@link https://developers.facebook.com/docs/whatsapp/api/settings/media-providers}
   */
  provider?: string;
}
