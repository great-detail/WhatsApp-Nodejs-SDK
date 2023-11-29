/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParams } from "../API/AbstractAPI";
import MessageAPI from "../MessageAPI";
import WebhookAPI from "../WebhookAPI";

export interface WhatsAppAPIParams extends AbstractAPIParams {}

/**
 * WhatsApp API.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 * @example
 * // SDK instantiation
 * const sdk = new WhatsAppAPI("123456")
 */
export default class WhatsAppAPI extends AbstractAPI {
  public message: MessageAPI;
  public webhook: WebhookAPI;

  constructor(params: WhatsAppAPIParams) {
    super(params);
    this.message = new MessageAPI(params);
    this.webhook = new WebhookAPI(params);
  }
}
