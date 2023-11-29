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

export interface GraphRequestCreateParams extends RequestInit {
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
  /**
   * Default base URL for the Facebook Graph API.
   *
   * @since 4.0.0
   */
  public static DEFAULT_GRAPH_API_BASE_URL = "https://graph.facebook.com";

  /**
   * Default version for the Facebook Graph API.
   *
   * @since 4.0.0
   */
  public static DEFAULT_GRAPH_VERSION = "v18.0";

  /**
   * Create a new Graph API Request.
   *
   * @since 4.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public static create<C = unknown>({
    endpoint = "/",
    version = this.DEFAULT_GRAPH_VERSION,
    baseUrl = this.DEFAULT_GRAPH_API_BASE_URL,
    ...requestInit
  }: GraphRequestCreateParams) {
    return new GraphRequest<C>(
      new URL([version ? "/" : "", version, endpoint].join(""), baseUrl),
      requestInit,
    );
  }

  /**
   * Send Request using Fetch.
   *
   * @since 2.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public async send(): Promise<GraphResponse<T>> {
    return await fetch(this).then(
      ({ body, ...responseInit }) => new GraphResponse(body, responseInit),
    );
  }
}
