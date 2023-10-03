import APIInterface from "./APIInterface";
import EndpointType from "./EndpointType";
import type { Logger } from "winston";
export default abstract class AbstractAPI implements APIInterface {
    #private;
    businessId: string;
    protected _logger?: Logger | undefined;
    constructor(businessId: string, parent?: APIInterface | AbstractAPI, _logger?: Logger | undefined);
    protected getParentEndpoint(): string | undefined;
    protected joinEndpoints(...endpoints: (string | undefined)[]): string;
    protected abstract getEndpoint(): EndpointType;
}
