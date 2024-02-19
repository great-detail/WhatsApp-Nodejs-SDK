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
import fetch, { Request } from "cross-fetch";
import { Logger } from "winston";

export interface GraphRequestParameters extends RequestInit {
  version?: string;
  logger?: Logger;
}

export interface GraphRequestCreateParameters extends GraphRequestParameters {
  baseUrl?: string;
}

export interface GraphRequestSendParameters {
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
  public static DEFAULT_GRAPH_VERSION = "v19.0";

  /**
   * Graph API version.
   *
   * @since 6.5.0
   */
  public readonly version?: string;

  public constructor(
    url: string | URL,
    { logger, version, ...requestInit }: GraphRequestParameters = {},
  ) {
    super(url, requestInit);
    this.version = version;

    logger?.http(`${url.toString()} ${JSON.stringify(requestInit)}`);
  }

  /**
   * Create Graph Request.
   */
  public static create<T = unknown>(
    endpoint: EndpointType,
    {
      version = GraphRequest.DEFAULT_GRAPH_VERSION,
      baseUrl = GraphRequest.DEFAULT_GRAPH_API_BASE_URL,
      ...options
    }: GraphRequestCreateParameters = {},
  ) {
    const path = [version ? "/" : "", version, endpoint].join("");
    const url = new URL(path, baseUrl).toString();

    return new GraphRequest<T>(url, { version, ...options });
  }

  /**
   * Send Request using Fetch.
   *
   * @since 2.0.0
   */
  public async send({
    fetch: fetchAlternative = fetch,
    ...requestInit
  }: GraphRequestSendParameters = {}): Promise<GraphResponse<T>> {
    if (requestInit.headers) {
      const parsedHeaders = new Headers(requestInit.headers);
      for (const [key, value] of parsedHeaders) {
        this.headers.set(key, value);
      }
    }

    // See: https://github.com/node-fetch/node-fetch/issues/481#issuecomment-592491825
    return await fetchAlternative(this.url, this).then(
      ({ body, ...responseInit }) =>
        new GraphResponse(body, { request: this, ...responseInit }),
    );
  }
}
