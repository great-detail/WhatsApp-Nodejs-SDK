/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParams } from "../API/AbstractAPI";
import CloudAPIMessage from "./CloudAPIMessage";
import CloudAPIWebhook from "./CloudAPIWebhook";

export interface WhatsAppAPIParams extends AbstractAPIParams {}

/**
 * WhatsApp Cloud API SDK.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 * @example
 * // SDK instantiation
 * const sdk = new CloudWhatsAppAPI("123456")
 */
export default class CloudAPI extends AbstractAPI {
  /**
   * Message API.
   *
   * @since 5.5.0
   * @example
   * // Send a Text Message
   * const message = sdk.message.text({ body: "Hello"}, { toNumber: "1234567890" });
   * const sendReceipt = await message.send();
   * console.log(sendReceipt);
   */
  public message: CloudAPIMessage;

  /**
   * Webhook API.
   *
   * @since 4.0.0
   */
  public webhook: CloudAPIWebhook;

  constructor(params: WhatsAppAPIParams) {
    super(params);
    this.message = new CloudAPIMessage(params);
    this.webhook = new CloudAPIWebhook(params);
  }
}
