/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI from "../API/AbstractAPI";
import MessageAPI from "../MessageAPI";
import WebhookAPI from "../WebhookAPI";
import type { Logger } from "winston";

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

  constructor(businessId: string, logger?: Logger) {
    super(businessId, logger);

    this.message = new MessageAPI(this.businessId, this._logger);
    this.webhook = new WebhookAPI(this.businessId, this._logger);
  }
}
