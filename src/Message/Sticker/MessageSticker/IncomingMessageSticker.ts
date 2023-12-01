/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import MessageSticker from ".";

export default interface IncomingMessageSticker extends MessageSticker {
  /**
   * Hash for the sticker.
   *
   * @since 5.0.0
   */
  sha256: string;

  /**
   * Set to true if the sticker is animated; false otherwise.
   *
   * @since 5.0.0
   */
  animated: boolean;
}
