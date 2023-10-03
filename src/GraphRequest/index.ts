/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import EndpointType from "../API/EndpointType";
import GraphResponse from "../GraphResponse";
import {
  DEFAULT_GRAPH_API_BASE_URL,
  DEFAULT_GRAPH_VERSION,
} from "../constants";

export interface GraphRequestProps extends RequestInit {
  endpoint?: EndpointType;
  version?: string;
  baseUrl?: string;
}

/**
 * Graph API Request.
 * Provides a simple wrapper around the native Request API to simplify access
 * via HTTP request to the Facebook Graph API.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default class GraphRequest<T = unknown> extends Request {
  public endpoint: EndpointType;
  public version: string;
  public baseUrl: string;

  constructor({
    endpoint = "/",
    version = DEFAULT_GRAPH_VERSION,
    baseUrl = DEFAULT_GRAPH_API_BASE_URL,
    ...requestInit
  }: GraphRequestProps) {
    super(new URL([version ? "/" : "", version, endpoint].join(""), baseUrl), {
      ...requestInit,
    });

    this.endpoint = endpoint;
    this.version = version;
    this.baseUrl = baseUrl;
  }

  /**
   * Send Request using Fetch.
   *
   * @since 2.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public async send(): Promise<GraphResponse<T>> {
    return await fetch(this).then(
      ({ body, status, statusText, headers }) =>
        new GraphResponse(body, { status, statusText, headers }),
    );
  }
}
