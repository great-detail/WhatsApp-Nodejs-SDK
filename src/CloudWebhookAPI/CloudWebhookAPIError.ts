/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export default class CloudWebhookAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CloudWebhookAPIError";
  }
}
