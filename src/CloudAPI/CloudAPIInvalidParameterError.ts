/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

/**
 * Cloud API Invalid Parameter Error.
 *
 * @since 6.0.0
 */
export default class CloudAPIInvalidParameterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CloudAPIInvalidParameterError";
  }
}
