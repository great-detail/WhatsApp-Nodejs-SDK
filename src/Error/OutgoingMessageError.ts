/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import Error from "./index.js";

export default interface OutgoingMessageError extends Error {
  /**
   * Error type.
   */
  type: string;

  /**
   * Graph API subcode. Not all responses will include a subcode.
   *
   * @deprecated Since Graph API v16.0
   */
  error_subcode?: number;

  error_data?: {
    messaging_product: "whatsapp";

    /**
     * Error description and a description of the most likely reason for the
     * error. May also contain information on how to address the error, such as
     * which parameter is invalid or what values are acceptable.
     */
    details: string;
  };

  /**
   * Trace ID you can include when contacting Direct Support. The ID may help
   * support to debug the error.
   */
  fbtrace_id: string;
}
