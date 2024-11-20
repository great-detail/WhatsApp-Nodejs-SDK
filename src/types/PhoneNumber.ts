/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

/**
 * A Phone Number. **Not** a Phone Number ID.
 */
export type PhoneNumberString = `+${string}` | (string & NonNullable<unknown>);

/**
 * WhatsApp Phone Number ID.
 *
 * @since 7.0.0
 */
export type PhoneNumberID = string;
