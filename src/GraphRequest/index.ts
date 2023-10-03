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

  public async send(): Promise<GraphResponse<T>> {
    return await fetch(this).then(
      ({ body, status, statusText, headers }) =>
        new GraphResponse(body, { status, statusText, headers }),
    );
  }
}
