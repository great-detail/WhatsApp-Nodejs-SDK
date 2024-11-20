/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export type WhatsappError = {
  code: number;
  message?: string;
  type: string;
  title?: string;
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

  /**
   * @deprecated Since Graph API v16.0.
   */
  error_subcode?: number;
};
