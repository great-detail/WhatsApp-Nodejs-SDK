/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import Error, { ErrorMessage } from "./index.js";

export default interface EventNotificationError extends Error {
  /**
   * Error code title.
   */
  title: ErrorMessage;

  /**
   * An error data object.
   *
   * @since Graph API v16.0
   */
  error_data?: {
    /**
     * Describes the error.
     *
     * @since Graph API v16.0
     */
    details: string;
  };
}
