/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import EndpointType from "../API/EndpointType.js";
import GraphResponse from "../GraphResponse/index.js";
import { Logger } from "winston";

export interface GraphRequestParameters extends RequestInit {
  version?: string;
  baseUrl?: string;
  logger?: Logger;
}

export interface GraphRequestCreateParams extends GraphRequestParameters {}

export interface GraphRequestSendParams {
  /**
   * Fetch provider.
   * Used to override the default fetch provider and use polyfills or other
   * libraries.
   *
   * @since 5.4.0
   */
  fetch?: typeof fetch;

  /**
   * Request headers.
   * Used to override the default request headers or set sensitive headers that
   * shouldn't be included in debug log outputs.
   *
   * @since 6.5.1
   */
  headers?: HeadersInit;
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
   * Graph API version.
   *
   * @since 6.5.0
   */
  public readonly version: string;

  /**
   * Graph API endpoint.
   *
   * @since 6.5.0
   */
  public readonly endpoint: string;

  /**
   * Graph API base URL.
   *
   * @since 6.5.0
   */
  public readonly baseUrl: string;

  public constructor(
    endpoint: EndpointType,
    {
      logger,
      version = GraphRequest.DEFAULT_GRAPH_VERSION,
      baseUrl = GraphRequest.DEFAULT_GRAPH_API_BASE_URL,
      ...requestInit
    }: GraphRequestParameters = {},
  ) {
    const url = new URL(
      [version ? "/" : "", version, endpoint].join(""),
      baseUrl,
    );

    super(url, requestInit);
    this.version = version;
    this.endpoint = endpoint;
    this.baseUrl = baseUrl;

    logger?.http(`${url.toString()} ${JSON.stringify(requestInit)}`);
  }

  /**
   * Send Request using Fetch.
   *
   * @since 2.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public async send({
    fetch: fetchAlternative = fetch,
    ...requestInit
  }: GraphRequestSendParams = {}): Promise<GraphResponse<T>> {
    if (requestInit.headers) {
      const parsedHeaders = new Headers(requestInit.headers);
      for (const [key, value] of parsedHeaders) {
        this.headers.set(key, value);
      }
    }

    return await fetchAlternative(this, requestInit).then(
      ({ body, ...responseInit }) =>
        new GraphResponse(body, { request: this, ...responseInit }),
    );
  }
}
