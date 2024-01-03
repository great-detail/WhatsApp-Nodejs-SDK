/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import Error, { ErrorMessage } from "./index.js";

export default interface IncomingMessageError extends Error {
  /**
   * Error code title.
   *
   * @since 4.2.0
   */
  title: ErrorMessage;

  /**
   * An error data object.
   *
   * @since 4.2.0, Graph API v16.0
   */
  error_data?: {
    /**
     * Describes the error.
     *
     * @since 4.2.0, Graph API v16.0
     */
    details: string;
  };
}
