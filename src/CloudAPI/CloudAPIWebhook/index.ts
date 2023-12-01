/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI from "../../API/AbstractAPI";
import { EventNotificationType } from "../../EventNotification";
import CloudAPIWebhookError from "./CloudWebhookAPIError";
import { IncomingMessage, ServerResponse } from "http";
import { createHmac } from "node:crypto";

export interface WebhookAPIRegisterReturn {
  /**
   * The verify token sent by WhatsApp.
   * This should be checked against your own verify token to ensure that the
   * request is valid.
   *
   * @since 4.0.0
   */
  verifyToken: string;

  /**
   * The challenge sent by WhatsApp.
   * This should be returned to WhatsApp to verify that the request is valid.
   * Unless you have a specific reason to do otherwise, this will be returned
   * to WhatsApp when you call `reg.accept()`.
   *
   * @since 4.0.0
   */
  challenge: string;

  /**
   * Accept the Webhook Registration.
   * This should be the **last** step in your request handler as it may call
   * `req.end()`.
   *
   * @since 4.0.0
   * @example
   * // Accept the Webhook Registration
   * // Within your request handler:
   * return reg.accept();
   */
  accept: () => ServerResponse;

  /**
   * Reject the Webhook Registration.
   * This should be the **last** step in your request handler as it may call
   * `req.end()`.
   *
   * @since 4.0.0
   * @example
   * // Reject the Webhook Registration
   * // Within your request handler:
   * return reg.reject();
   */
  reject: () => ServerResponse;
}

export interface WebhookAPIEventNotificationReturn {
  eventNotification: EventNotificationType;
  /**
   * Accept the Incoming Webhook
   * This should be the **last** step in your request handler as it may call
   * `req.end()`.
   *
   * @since 4.0.0
   * @example
   * // Accept the Incoming Webhook
   * // Within your request handler:
   * return event.accept();
   */
  accept: () => ServerResponse;

  /**
   * Reject the Incoming Webhook.
   * This should be the **last** step in your request handler as it may call
   * `req.end()`.
   *
   * @since 4.0.0
   * @example
   * // Reject the Incoming Webhook
   * // Within your request handler:
   * return event.reject();
   */
  reject: () => ServerResponse;

  /**
   * Check the integrity of the request body.
   * This determines whether the integrity of the webhook body is valid and
   * returns a boolean to represent this.
   *
   * @since 4.0.0
   */
  checkIntegrity: (appSecret: string) => boolean;

  /**
   * Verify the integrity of the request body.
   * This method will throw an error if the integrity of the webhook body is
   * invalid.
   *
   * @since 4.0.0
   * @throws {CloudWebhookAPIError}
   */
  verifyIntegrity: (appSecret: string) => void;
}

/**
 * Webhook API.
 *
 * @since 1.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 * @example
 * // Receive Registration Requests via Webhook
 * app.get(
 *   "/path/to/webhook",
 *   async (req, res) => {
 *     const reg = await sdk.webhook.register(req, res);
 *     // DIY: Check the reg.verifyToken value
 *     if (reg.verifyToken === "abcd") {
 *       return reg.reject();
 *     }
 *     return reg.accept();
 *   }
 * );
 * @example
 * // Receive a Message via Webhook
 * app.post(
 *   "/path/to/webhook",
 *   async (req, res) => {
 *     const event = sdk.webhook.eventNotification(req, res);
 *     // DIY: Load the Meta App Secret
 *     event.verifyIntegrity("abcd-app-secret");
 *     if (someFailedCondition) {
 *       return event.reject();
 *     }
 *     return event.accept();
 *   }
 * );
 */
export default class CloudAPIWebhook extends AbstractAPI {
  /**
   * Handle a Registration Webhook Request.
   * The handler for `GET` requests to your webhook endpoint. A registration
   * request is when WhatsApp sends a GET request to your webhook endpoint to
   * verify that it is valid. The challenge should be returned if valid.
   *
   * @since 4.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   * @throws {CloudWebhookAPIError}
   */
  public async register(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<WebhookAPIRegisterReturn> {
    const urlString = req.url;
    if (!urlString) {
      throw new CloudAPIWebhookError("No URL in request");
    }

    const url = new URL(urlString);
    const hubMode = url.searchParams.get("hub.mode");
    const hubChallenge = url.searchParams.get("hub.challenge");
    const hubVerifyToken = url.searchParams.get("hub.verify_token");

    if (!hubMode || hubMode !== "subscribe") {
      throw new CloudAPIWebhookError(
        "Invalid or unsupported hub.mode in request",
      );
    }

    if (!hubChallenge) {
      throw new CloudAPIWebhookError("Invalid hub.challenge in request");
    }

    if (!hubVerifyToken) {
      throw new CloudAPIWebhookError("Invalid hub.verify_token in request");
    }

    return {
      verifyToken: hubVerifyToken,
      challenge: hubChallenge,
      accept: () => {
        return res.end(hubChallenge);
      },
      reject: () => {
        return res.end();
      },
    };
  }

  /**
   * Handle an Event Notification Webhook Request.
   * The handler for `POST` requests to your webhook endpoint.
   *
   * @since 4.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public async eventNotification(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<WebhookAPIEventNotificationReturn> {
    const xHubSignature = req.headers["x-hub-signature"]
      ?.toString()
      .replace("sha256=", "");
    if (!xHubSignature) {
      throw new CloudAPIWebhookError("No X-Hub-Signature in request");
    }

    // Async request body buffering
    const bodyBuffer = await new Promise<Buffer>((resolve, reject) => {
      let cumulativeSize = 0;
      const bodyBufferChunks: Buffer[] = [];

      req
        .on("data", (chunk) => {
          bodyBufferChunks.push(chunk);
          cumulativeSize = cumulativeSize + chunk.length;

          if (cumulativeSize > 1e6) {
            reject(
              new CloudAPIWebhookError("Request body exceeds 1MB maximum size"),
            );
          }
        })
        .on("end", () => {
          resolve(Buffer.concat(bodyBufferChunks));
        })
        .on("error", reject);
    });

    const bodyString = bodyBuffer.toString("utf8");
    const eventNotification: EventNotificationType = JSON.parse(bodyString);

    const checkIntegrity = (appSecret: string) => {
      const generatedSignature = createHmac("sha256", appSecret)
        .update(bodyString)
        .digest("hex");
      return xHubSignature === generatedSignature;
    };

    return {
      eventNotification,
      checkIntegrity,
      verifyIntegrity: (appSecret: string) => {
        if (!checkIntegrity(appSecret)) {
          throw new CloudAPIWebhookError("Invalid X-Hub-Signature in request");
        }
      },
      accept: () => {
        return res.end();
      },
      reject: () => {
        return res.end();
      },
    };
  }
}
