import AbstractAPI from "../API/AbstractAPI";
import MessageAPI from "../MessageAPI";
import {
  DEFAULT_GRAPH_API_BASE_URL,
  DEFAULT_GRAPH_VERSION,
} from "src/constants";
import type { Logger } from "winston";

/**
 * WhatsApp API.
 *
 * @since 0.0.6
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default class WhatsAppAPI extends AbstractAPI {
  message = new MessageAPI(this.businessId, this, this._logger);

  constructor(
    public businessId: string,
    public version: string = DEFAULT_GRAPH_VERSION,
    public baseUrl: string = DEFAULT_GRAPH_API_BASE_URL,
    logger?: Logger,
  ) {
    super(businessId, undefined, logger);
    this.version = version;
    this.baseUrl = baseUrl;
  }

  protected getEndpoint(): string {
    return `${this.version}/`;
  }
}
