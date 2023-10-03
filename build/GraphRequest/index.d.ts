import EndpointType from "../API/EndpointType";
import GraphResponse from "../GraphResponse";
export interface GraphRequestProps extends RequestInit {
    endpoint?: EndpointType;
    version?: string;
    baseUrl?: string;
}
export default class GraphRequest<T = unknown> extends Request {
    endpoint: EndpointType;
    version: string;
    baseUrl: string;
    constructor({ endpoint, version, baseUrl, ...requestInit }: GraphRequestProps);
    send(): Promise<GraphResponse<T>>;
}
