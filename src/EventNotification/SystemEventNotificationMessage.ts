/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { WhatsAppAccountID } from "../API/AbstractAPI";

type SystemEventNotificationMessage = {
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
  customer: WhatsAppAccountID;

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
   * @deprecated since Graph API v11.0
   */
  new_wa_id: WhatsAppAccountID;

  /**
   * New WhatsApp ID for the customer when their phone number is updated.
   *
   * @since 4.2.0, Graph API v12.0
   */
  wa_id: WhatsAppAccountID;
};

export default SystemEventNotificationMessage;
