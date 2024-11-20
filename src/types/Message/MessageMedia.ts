/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export type CreateMessageMedia = {
  /**
   * ID for the media file.
   */
  id?: string;

  /**
   * Required when type is audio, document, image, sticker, or video and you
   * are not using an uploaded media ID (i.e. you are hosting the media asset
   * on your public server).
   *
   * The protocol and URL of the media to be sent. Use only with HTTP/HTTPS URLs.
   *
   * Do not use this field when message type is set to text.
   *
   * Cloud API users only:
   *
   * - See {@link https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#media-http-caching}
   *   if you would like us to cache the media asset for future messages.
   * - When we request the media asset from your server you must indicate the
   *   media's MIME type by including the `Content-Type` HTTP header. For
   *   example: `Content-Type: video/mp4`. See
   *   {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types}
   *   for a list of supported media and their MIME types.
   */
  link?: string;

  /**
   * Media asset caption. Do not use with audio or sticker media.
   *
   * On-Premises API users:
   *
   * - For v2.41.2 or newer, this field is limited to 1024 characters.
   * - Captions are currently not supported for `document` media.
   */
  caption?: string;

  /**
   * Describes the filename for the specific document. Use only with document
   * media.
   *
   * The extension of the filename will specify what format the document is
   * displayed as in WhatsApp.
   */
  filename?: string;
};

export type EventNotificationMessageMedia = {
  /**
   * ID for the media file.
   *
   * @since 5.0.0
   */
  id?: string;

  /**
   * Mime type of the media file.
   *
   * @since 5.0.0
   */
  mime_type: string;

  /**
   * Media asset caption. Do not use with audio or sticker media.
   *
   * On-Premises API users:
   *
   * - For v2.41.2 or newer, this field is limited to 1024 characters.
   * - Captions are currently not supported for `document` media.
   */
  caption?: string;

  /**
   * Describes the filename for the specific document. Use only with document
   * media.
   *
   * The extension of the filename will specify what format the document is
   * displayed as in WhatsApp.
   */
  filename?: string;

  /**
   * Image hash.
   */
  sha256: string;
};
