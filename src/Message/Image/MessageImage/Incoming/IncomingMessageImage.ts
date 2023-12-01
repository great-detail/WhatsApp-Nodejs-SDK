/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import MessageImage from "..";

export default interface IncomingMessageImage extends MessageImage {
  /**
   * Caption for the image, if provided.
   *
   * @since 5.0.0
   */
  caption?: string;

  /**
   * Image hash.
   *
   * @since 5.0.0
   */
  sha256: string;
}
