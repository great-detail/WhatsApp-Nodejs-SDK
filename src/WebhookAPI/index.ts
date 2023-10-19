/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI from "../API/AbstractAPI";
import { IncomingMessage, ServerResponse } from "http";

export type AcceptParamsType = {
  verifyToken: string;
};

export type AcceptType = (params: AcceptParamsType) => Promise<void>;

export default class WebhookAPI extends AbstractAPI {
  protected getEndpoint(): string {
    return this.joinEndpoints(
      this.getParentEndpoint(),
      this.businessId,
      "webhooks",
    );
  }

  public async subscribe(
    req: IncomingMessage,
    res: ServerResponse,
    accept: AcceptType,
  ): Promise<ServerResponse> {
    if (!req.url) {
      throw new Error();
    }

    const url = new URL(req.url);

    if (url.searchParams.get("hub.mode") !== "subscribe") {
      throw new Error();
    }

    const xHubChallenge = url.searchParams.get("hub.challenge");
    if (!xHubChallenge) {
      throw new Error();
    }

    const verifyToken = url.searchParams.get("hub.verify_token");
    if (!verifyToken) {
      throw new Error();
    }

    let error: Error | undefined;
    const responseParams = await accept({ verifyToken })
      .then(() => {
        return true;
      })
      .catch((err) => {
        error = err;
        return false;
      });

    if (error || !responseParams) {
      res.writeHead(401);
      res.write(error?.message);
      return res;
    }

    res.write(xHubChallenge);
    return res;
  }
}
