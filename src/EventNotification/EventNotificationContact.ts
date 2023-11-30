import { AccountID } from "../ID";

/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export default interface EventNotificationContact {
  /**
   * The customer's WhatsApp ID. A business can respond to a customer using
   * this ID. This ID may not match the customer's phone number, which is
   * returned by the API as input when sending a message to the customer.
   *
   * @since 4.2.0
   */
  wa_id: AccountID;

  /**
   * A customer profile object.
   *
   * @since 4.2.0
   */
  profile: {
    /**
     * The customer's name.
     *
     * @since 4.2.0
     */
    name: string;
  };
}
