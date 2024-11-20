/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { AccountID } from "../Account.js";

export type EventNotificationMessageSystem = {
  /**
   * Describes the change to the customer's identity or phone number.
   */
  body: string;

  /**
   * Hash for the identity fetched from server.
   */
  identity: string;

  /**
   * The WhatsApp ID for the customer prior to the update.
   */
  customer: AccountID;

  /**
   * Type of system update.
   */
  type: "customer_changed_number" | "customer_identity_changed.js";

  /**
   * New WhatsApp ID for the customer when their phone number is updated.
   *
   * @deprecated since Webhook v11.0
   */
  new_wa_id: AccountID;

  /**
   * New WhatsApp ID for the customer when their phone number is updated.
   */
  wa_id: AccountID;
};
