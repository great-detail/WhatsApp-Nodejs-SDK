/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParams } from "../API/AbstractAPI";
import CloudMessageAPI from "../CloudMessageAPI";
import CloudWebhookAPI from "../CloudWebhookAPI";

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
export default class CloudWhatsAppAPI extends AbstractAPI {
  public message: CloudMessageAPI;
  public webhook: CloudWebhookAPI;

  constructor(params: WhatsAppAPIParams) {
    super(params);
    this.message = new CloudMessageAPI(params);
    this.webhook = new CloudWebhookAPI(params);
  }
}
