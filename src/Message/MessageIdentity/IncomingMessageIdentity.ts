/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export default interface IncomingMessageIdentity {
  /**
   * State of acknowledgment for the messages system customer_identity_changed.
   *
   * @since 4.2.0
   */
  acknowledged: string;

  /**
   * The time when the WhatsApp Business Management API detected the customer
   * may have changed their profile information.
   *
   * @since 4.2.0
   */
  created_timestamp: string;

  /**
   * The ID for the messages system customer_identity_changed.
   *
   * @since 4.2.0
   */
  hash: string;
}
