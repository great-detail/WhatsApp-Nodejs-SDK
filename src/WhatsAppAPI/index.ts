/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI from "../API/AbstractAPI";
import GraphRequest from "../GraphRequest";
import MessageAPI from "../MessageAPI";
import type { Logger } from "winston";

/**
 * WhatsApp API.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 * @example
 * // Simple Use Cases
 * const sdk = new WhatsAppAPI("123456");
 * const message = sdk.message.text({ body: "Hello"}, { toNumber: "1234567890" });
 * const sendReceipt = await message.send();
 * console.log(sendReceipt);
 */
export default class WhatsAppAPI extends AbstractAPI {
  public message: MessageAPI;

  constructor(
    businessId: string,
    public version: string = GraphRequest.DEFAULT_GRAPH_VERSION,
    public baseUrl: string = GraphRequest.DEFAULT_GRAPH_API_BASE_URL,
    logger?: Logger,
  ) {
    super(businessId, undefined, logger);
    this.version = version;
    this.baseUrl = baseUrl;

    this.message = new MessageAPI(this.businessId, this, this._logger);
  }

  protected getEndpoint(): string {
    return "/";
  }
}
