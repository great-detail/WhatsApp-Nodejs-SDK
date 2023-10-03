import AbstractAPI from "../API/AbstractAPI";
import MessageAPI from "../MessageAPI";
import type { Logger } from "winston";
/**
 * WhatsApp API.
 *
 * @since 0.0.6
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default class WhatsAppAPI extends AbstractAPI {
    version: string;
    baseUrl: string;
    message: MessageAPI;
    constructor(businessId: string, version?: string, baseUrl?: string, logger?: Logger);
    protected getEndpoint(): string;
}
