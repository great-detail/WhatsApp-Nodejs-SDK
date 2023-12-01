/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export type MessageStatusStatus = "read" | (string & NonNullable<unknown>);

/**
 * Base Message Status.
 *
 * @since 4.2.0
 */
export default interface MessageStatus {
  status: MessageStatusStatus;
}
