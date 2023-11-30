/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

/**
 * WhatsApp Phone Number.
 *
 * @since 4.2.0
 */
export type PhoneNumber = string;

/**
 * WhatsApp Account ID.
 *
 * @since 4.2.0
 */
export type AccountID = string;

/**
 * WhatsApp Message ID.
 *
 * @since 4.2.0
 */
export type MessageID = string;

/**
 * Base Message.
 *
 * @since 4.2.0
 */
export default interface Message {
  [key: string]: unknown;
}
