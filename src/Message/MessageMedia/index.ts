/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export default interface MessageMedia {
  /**
   * Required when type is audio, document, image, sticker, or video and you
   * are not using a link.
   *
   * The media object ID. Do not use this field when message type is set to
   * text.
   *
   * @since 4.2.0
   */
  id?: string;
}
