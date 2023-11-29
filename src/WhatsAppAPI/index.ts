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
