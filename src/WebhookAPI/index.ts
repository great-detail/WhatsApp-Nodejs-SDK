/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI from "../API/AbstractAPI";
import WebhookAPIError from "./WebhookAPIError";
import { IncomingMessage, ServerResponse } from "http";

/**
 * Webhook API.
 *
 * @since 1.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 * @example
 * // Receive Registration Requests via Webhook
 * const app = express(); // or any other express-like app
 * app.get(
 *   "/path/to/webhook",
 *   async (req, res) => {
 *     const reg = await sdk.webhook.register(req, res);
 *     // DIY: Check the reg.verifyToken value
 *     return reg.accept();
 *   }
 * )
 * @example
 * // Receive a Message via Webhook
 * const app = express(); // or any other express-like app
 * app.post("/path/to/webhook", sdk.webhook.eventNotification);
 * app.listen(3000);
 */
export default class WebhookAPI extends AbstractAPI {
  public async register(req: IncomingMessage, res: ServerResponse) {
    const urlString = req.url;
    if (!urlString) {
      throw new WebhookAPIError("No URL in request");
    }

    const url = new URL(urlString);
    const hubMode = url.searchParams.get("hub.mode");
    const hubChallenge = url.searchParams.get("hub.challenge");
    const hubVerifyToken = url.searchParams.get("hub.verify_token");

    if (!hubMode || hubMode !== "subscribe") {
      throw new WebhookAPIError("Invalid or unsupported hub.mode in request");
    }

    if (!hubChallenge) {
      throw new WebhookAPIError("Invalid hub.challenge in request");
    }

    if (!hubVerifyToken) {
      throw new WebhookAPIError("Invalid hub.verify_token in request");
    }

    return {
      verifyToken: hubVerifyToken,
      challenge: hubChallenge,
      accept: () => {
        return res.end(hubChallenge);
      },
    };
  }
}
