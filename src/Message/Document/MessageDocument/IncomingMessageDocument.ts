/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import MessageDocument from ".";

export default interface IncomingMessageDocument extends MessageDocument {
  /**
   * Caption for the document, if provided.
   *
   * @since 5.0.0
   */
  caption?: string;

  /**
   * Name for the file on the sender's device.
   *
   * @since 5.0.0
   */
  filename: string;

  /**
   * SHA 256 hash.
   *
   * @since 5.0.0
   */
  sha256: string;
}
