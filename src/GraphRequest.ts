import { DEFAULT_GRAPH_API_BASE_URL, DEFAULT_GRAPH_VERSION } from "./constants";

export type GraphVersionType = `v${number}.${number}`;
export type AccessTokenType = string;
export type PathType = `/${string}`;

export interface GraphRequestBuildURLProps {
  baseUrl?: string;
  version?: GraphVersionType;
  path?: PathType;
}

export interface GraphRequestProps
  extends RequestInit,
    GraphRequestBuildURLProps {
  accessToken: AccessTokenType;
}

export default class GraphRequest extends Request {
  public baseUrl: string;
  public version?: GraphVersionType;
  public path: PathType = "/";

  constructor({
    version = DEFAULT_GRAPH_VERSION,
    baseUrl = DEFAULT_GRAPH_API_BASE_URL,
    path = "/",
    accessToken,
    ...requestInit
  }: GraphRequestProps) {
    super(new URL([version ? "/" : "", version, path].join(""), baseUrl), {
      ...requestInit,
    });

    this.path = path;
    this.version = version;
    this.baseUrl = baseUrl;
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", `Bearer ${accessToken}`);
  }

  public static async send(request: GraphRequest): Promise<Response> {
    return fetch(request);
  }
}
