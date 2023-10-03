import APIInterface from "./APIInterface";
import EndpointType from "./EndpointType";
import type { Logger } from "winston";

/**
 * Abstract API.
 * Provides some of the common functionality for the API classes, including
 * those that are likely to be reused such as endpoint construction.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default abstract class AbstractAPI implements APIInterface {
  #parent?: APIInterface | AbstractAPI;

  constructor(
    public businessId: string,
    parent?: APIInterface | AbstractAPI,
    protected _logger?: Logger,
  ) {
    this.#parent = parent;
  }

  /**
   * Retrieve the parent endpoint.
   * Introduces helpers for accessing parent endpoints and constructing
   * endpoints through subdirectory paths.
   *
   * @since 2.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  protected getParentEndpoint(): string | undefined {
    if (this.#parent instanceof AbstractAPI) {
      return this.#parent.getEndpoint();
    }

    return;
  }

  /**
   * Join Endpoint Sections.
   * Filters out any falsy values and joins the remaining values together to
   * form a valid HTTP path.
   *
   * @since 2.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  protected joinEndpoints(...endpoints: (string | undefined)[]) {
    return endpoints
      .filter<string>(
        (endpoint): endpoint is string => typeof endpoint === "string",
      )
      .map((endpoint) => {
        let trimmedEndpoint = endpoint;

        if (trimmedEndpoint.startsWith("/")) {
          trimmedEndpoint = trimmedEndpoint.slice(1);
        }

        if (trimmedEndpoint.endsWith("/")) {
          trimmedEndpoint = trimmedEndpoint.slice(0, -1);
        }

        return trimmedEndpoint;
      })
      .join("/");
  }

  protected abstract getEndpoint(): EndpointType;
}
