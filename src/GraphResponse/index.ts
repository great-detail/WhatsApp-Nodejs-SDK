/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import GraphRequest from "../GraphRequest/index.js";
import type { Response } from "cross-fetch";

export interface GraphResponseParameters<T = unknown> {
  request?: GraphRequest<T>;
}

/**
 * Graph API Response.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default class GraphResponse<T = unknown> {
  public readonly request?: GraphRequest<T>;

  constructor(
    public response: Response,
    { request }: GraphResponseParameters<T> = {},
  ) {
    this.request = request;
  }

  /**
   * Whether the Request was upgraded in API versions.
   * If the incoming version cannot be determined then undefined will be
   * returned.
   *
   * @since 6.5.0
   */
  public get isUpgraded(): boolean | undefined {
    const outgoingVersion = this.request?.version;
    const incomingVersion = this.response.headers.get("facebook-api-version");
    if (!incomingVersion || !outgoingVersion) {
      return undefined;
    }

    return incomingVersion === outgoingVersion;
  }

  public json(): Promise<T> {
    return this.response.json();
  }
}
