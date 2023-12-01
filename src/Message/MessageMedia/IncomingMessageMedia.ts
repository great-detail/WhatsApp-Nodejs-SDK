/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import MessageMedia from ".";

export default interface IncomingMessageMedia extends MessageMedia {
  /**
   * Mime type of the media file.
   *
   * @since 5.0.0
   */
  mime_type: string;
}
