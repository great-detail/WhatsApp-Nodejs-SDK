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
import { createHmac } from "crypto";
import { IncomingMessage, ServerResponse } from "http";

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
 * @since 4.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
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
   * @example
   * // Receive Registration Requests via Webhook
   * app.get(
   *   "/path/to/webhook",
   *   async (req, res) => {
   *     const reg = await sdk.webhook.register(req, res);
   *     // DIY: Check the reg.verifyToken value
   *     if (reg.verifyToken !== "abcd") {
   *       return reg.reject();
   *     }
   *     return reg.accept();
   *   }
   * );
   */
  public async register(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<WebhookAPIRegisterReturn> {
    this._logger?.http(`Received Webhook Registration: "${req.url}"`);

    const url = req.url ? new URL(req.url) : undefined;
    if (!url) {
      throw CloudAPIWebhookError.invalidURL();
    }

    const hubMode = url.searchParams.get("hub.mode") ?? undefined;
    if (!hubMode || hubMode !== "subscribe") {
      throw CloudAPIWebhookError.invalidHubMode(hubMode);
    }

    const hubChallenge = url.searchParams.get("hub.challenge") ?? undefined;
    if (!hubChallenge) {
      throw CloudAPIWebhookError.invalidHubChallenge(hubChallenge);
    }

    const hubVerifyToken =
      url.searchParams.get("hub.verify_token") ?? undefined;
    if (!hubVerifyToken) {
      throw CloudAPIWebhookError.invalidVerifyToken();
    }

    return {
      /**
       * @inheritdoc
       */
      verifyToken: hubVerifyToken,

      /**
       * @inheritdoc
       */
      challenge: hubChallenge,

      /**
       * @inheritdoc
       */
      accept: () => {
        this._logger?.debug("Accepting Webhook Registration");
        return res.end(hubChallenge);
      },

      /**
       * @inheritdoc
       */
      reject: () => {
        this._logger?.debug("Rejecting Webhook Registration");
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
  public async eventNotification(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<WebhookAPIEventNotificationReturn> {
    this._logger?.http(`Received Webhook Event Notification: "${req.url}"`);

    const xHubSignature = req.headers["x-hub-signature-256"]
      ?.toString()
      .replace("sha256=", "");
    if (!xHubSignature) {
      throw CloudAPIWebhookError.invalidXHubSignature();
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
            reject(CloudAPIWebhookError.excessiveRequestBodySize());
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

      const isAuthentic = xHubSignature === generatedSignature;
      this._logger?.debug(
        `Comparing signatures for integrity check: "${xHubSignature}" === "${generatedSignature}" (${isAuthentic})`,
      );

      return isAuthentic;
    };

    return {
      /**
       * @inheritdoc
       */
      eventNotification,

      /**
       * @inheritdoc
       */
      checkIntegrity,

      /**
       * @inheritdoc
       */
      verifyIntegrity: (appSecret: string) => {
        if (!checkIntegrity(appSecret)) {
          throw CloudAPIWebhookError.mismatchedXHubSignature();
        }
      },

      /**
       * @inheritdoc
       */
      accept: () => {
        this._logger?.debug("Accepting Webhook Event Notification");
        return res.end();
      },

      /**
       * @inheritdoc
       */
      reject: () => {
        this._logger?.debug("Rejecting Webhook Event Notification");
        return res.end();
      },
    };
  }
}
