/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import Error from ".";

export default interface OutgoingMessageError extends Error {
  /**
   * Error type.
   *
   * @since 4.2.0
   */
  type: string;

  /**
   * Graph API subcode. Not all responses will include a subcode.
   *
   * @since 4.2.0
   * @deprecated since Graph API v16.0
   */
  error_subcode?: number;

  error_data?: {
    messaging_product: "whatsapp";

    /**
     * Error description and a description of the most likely reason for the
     * error. May also contain information on how to address the error, such as
     * which parameter is invalid or what values are acceptable.
     *
     * @since 4.2.0
     */
    details: string;
  };

  /**
   * Trace ID you can include when contacting Direct Support. The ID may help
   * support to debug the error.
   *
   * @since 4.2.0
   */
  fbtrace_id: string;
}
