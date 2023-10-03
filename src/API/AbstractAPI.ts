import APIInterface from "./APIInterface";
import EndpointType from "./EndpointType";
import type { Logger } from "winston";

export default abstract class AbstractAPI implements APIInterface {
  #parent?: APIInterface | AbstractAPI;

  constructor(
    public businessId: string,
    parent?: APIInterface | AbstractAPI,
    protected _logger?: Logger,
  ) {
    this.#parent = parent;
  }

  protected getParentEndpoint(): string | undefined {
    if (this.#parent instanceof AbstractAPI) {
      return this.#parent.getEndpoint();
    }

    return;
  }

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
