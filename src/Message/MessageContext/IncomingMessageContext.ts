/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { AccountID, MessageID } from "../../ID.js";

export default interface IncomingMessageContext {
  /**
   * Set to true if the message received by the business has been forwarded.
   *
   * @since 4.2.0
   */
  forwarded: boolean;

  /**
   * Set to true if the message received by the business has been forwarded
   * more than 5 times.
   *
   * @since 4.2.0
   */
  frequently_forwarded: boolean;

  /**
   * The WhatsApp ID for the customer who replied to an inbound message.
   *
   * @since 4.2.0
   */
  from: AccountID;

  /**
   * The message ID for the sent message for an inbound reply.
   *
   * @since 4.2.0
   */
  id: MessageID;

  /**
   * Referred product object describing the product the user is requesting
   * information about. You must parse this value if you support Product
   * Enquiry Messages.
   *
   * @since 4.2.0
   */
  referred_product: {
    /**
     * Unique identifier of the Meta catalog linked to the WhatsApp Business
     * Account.
     *
     * @since 4.2.0
     */
    catalog_id: string;

    /**
     * Unique identifier of the product in a catalog.
     *
     * @since 4.2.0
     */
    product_retailer_id: string;
  };
}
