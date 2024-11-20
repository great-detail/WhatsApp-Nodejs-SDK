/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export type EventNotificationMessageIdentity = {
  /**
   * State of acknowledgment for the messages system customer_identity_changed.
   */
  acknowledged: string;

  /**
   * The time when the WhatsApp Business Management API detected the customer
   * may have changed their profile information.
   */
  created_timestamp: string;

  /**
   * The ID for the messages system customer_identity_changed.
   */
  hash: string;
};
