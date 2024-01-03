/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { WhatsAppPhoneNumberID } from "../ID.js";

export default interface EventNotificationMetadata {
  /**
   * The phone number that is displayed for a business.
   *
   * @since 4.2.0
   */
  display_phone_number: string;

  /**
   * ID for the phone number. A business can respond to a message using this
   * ID.
   *
   * @since 4.2.0
   */
  phone_number_id: WhatsAppPhoneNumberID;
}
