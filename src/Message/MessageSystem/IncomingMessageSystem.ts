/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { AccountID } from "..";

export default interface IncomingMessageSystem {
  /**
   * Describes the change to the customer's identity or phone number.
   *
   * @since 4.2.0
   */
  body: string;

  /**
   * Hash for the identity fetched from server.
   *
   * @since 4.2.0
   */
  identity: string;

  /**
   * The WhatsApp ID for the customer prior to the update.
   *
   * @since 4.2.0
   */
  customer: AccountID;

  /**
   * Type of system update.
   *
   * @since 4.2.0
   */
  type: "customer_changed_number" | "customer_identity_changed";

  /**
   * New WhatsApp ID for the customer when their phone number is updated.
   *
   * @since 4.2.0
   * @deprecated since Webhook v11.0
   */
  new_wa_id: AccountID;

  /**
   * New WhatsApp ID for the customer when their phone number is updated.
   *
   * @since 4.2.0, Webhook v12.0
   */
  wa_id: AccountID;
}
