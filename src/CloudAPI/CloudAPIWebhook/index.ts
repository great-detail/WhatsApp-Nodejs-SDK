/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI from "../../API/AbstractAPI.js";
import { EventNotificationType } from "../../EventNotification/index.js";
import CloudAPIWebhookError from "./CloudWebhookAPIError.js";
import { createHmac } from "node:crypto";

export interface IncomingRequest {
  query: Record<string, string>;
  body?: string;
  headers: Record<string, string>;
}

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
   * This should be the **last** step in your request handler.
   *
   * @since 4.0.0
   * @example
   * // Accept the Webhook Registration
   * // Within your request handler:
   * return reg.accept();
   */
  accept: () => unknown;

  /**
   * Reject the Webhook Registration.
   * This should be the **last** step in your request handler.
   *
   * @since 4.0.0
   * @example
   * // Reject the Webhook Registration
   * // Within your request handler:
   * return reg.reject();
   */
  reject: () => unknown;
}

export interface WebhookAPIEventNotificationReturn {
  eventNotification: EventNotificationType;
  /**
   * Accept the Incoming Webhook
   * This should be the **last** step in your request handler.
   *
   * @since 4.0.0
   * @example
   * // Accept the Incoming Webhook
   * // Within your request handler:
   * return event.accept();
   */
  accept: () => unknown;

  /**
   * Reject the Incoming Webhook.
   * This should be the **last** step in your request handler.
   *
   * @since 4.0.0
   * @example
   * // Reject the Incoming Webhook
   * // Within your request handler:
   * return event.reject();
   */
  reject: () => unknown;

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
   * // ExpressJS:
   * app.get(
   *   "/path/to/webhook",
   *   async (req, res) => {
   *     const reg = await sdk.webhook.register({
   *       query: req.query,
   *       body: req.body,
   *       headers: req.headers,
   *     });
   *     // DIY: Check the reg.verifyToken value
   *     if (reg.verifyToken !== "abcd") {
   *       return res.end(reg.reject());
   *     }
   *     return res.end(reg.accept());
   *   }
   * );
   * @example
   * // Fastify
   * fastify.route({
   *   method: "GET",
   *   url: "/path/to/webhook",
   *   handler: (request, reply) => {
   *     const reg = await sdk.webhook.register({
   *       query: request.query,
   *       body: JSON.stringify(request.body),
   *       headers: request.headers,
   *     });
   *     // DIY: Check the reg.verifyToken value
   *     if (reg.verifyToken !== "abcd") {
   *       return reply.send(reg.reject());
   *     }
   *     return reply.send(reg.accept());
   *   }
   * })
   */
  public async register(
    request: IncomingRequest,
  ): Promise<WebhookAPIRegisterReturn> {
    this._logger?.http(
      `Received Webhook Registration: "${JSON.stringify(request)}"`,
    );

    const hubMode = request.query["hub.mode"] ?? undefined;

    this._logger?.debug("Checking hub.mode query parameter");
    if (!hubMode || hubMode !== "subscribe") {
      throw CloudAPIWebhookError.invalidHubMode(hubMode);
    }

    const hubChallenge = request.query["hub.challenge"] ?? undefined;

    this._logger?.debug("Checking hub.challenge query parameter");
    if (!hubChallenge) {
      throw CloudAPIWebhookError.invalidHubChallenge(hubChallenge);
    }

    const hubVerifyToken = request.query["hub.verify_token"] ?? undefined;

    this._logger?.debug("Checking hub.verify_token query parameter");
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
        return hubChallenge;
      },

      /**
       * @inheritdoc
       */
      reject: () => {
        this._logger?.debug("Rejecting Webhook Registration");
        return;
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
   * // ExpressJS
   * app.use(express.raw());
   * app.post(
   *   "/path/to/webhook",
   *   async (req, res) => {
   *     const event = sdk.webhook.eventNotification({
   *       query: req.query,
   *       body: req.body.toString(),
   *       headers: req.headers,
   *     });
   *     // DIY: Load the Meta App Secret
   *     event.verifyIntegrity("abcd-app-secret");
   *     if (someFailedCondition) {
   *       return res.end(event.reject());
   *     }
   *     return res.end(event.accept());
   *   }
   * );
   * @example
   * // Fastify
   * fastify.route({
   *   method: "POST",
   *   url: "/path/to/webhook",
   *   handler: (request, reply) => {
   *     const event = sdk.webhook.eventNotification({
   *       query: request.query,
   *       body: JSON.stringify(req.body),
   *       headers: request.headers,
   *     });
   *     // DIY: Load the Meta App Secret
   *     event.verifyIntegrity("abcd-app-secret");
   *     if (someFailedCondition) {
   *       return reply.send(event.reject());
   *     }
   *     return reply.send(event.accept());
   *   }
   * });
   */
  public async eventNotification(
    request: IncomingRequest,
  ): Promise<WebhookAPIEventNotificationReturn> {
    this._logger?.http(
      `Received Webhook Event Notification: "${JSON.stringify(request)}"`,
    );

    const xHubSignature1 = request.headers["x-hub-signature"]
      ?.toString()
      .replace("sha1=", "");
    if (xHubSignature1) {
      throw CloudAPIWebhookError.invalidXHubSignature();
    }

    const xHubSignature256 = request.headers["x-hub-signature-256"]
      ?.toString()
      .replace("sha256=", "");
    if (!xHubSignature256) {
      throw CloudAPIWebhookError.invalidXHubSignature();
    }

    if (!request.body) {
      throw CloudAPIWebhookError.missingBody();
    }

    // Async request body buffering
    const bodyString = Buffer.from(request.body).toString("utf8");
    const eventNotification: EventNotificationType = JSON.parse(bodyString);

    const checkIntegrity = (appSecret: string) => {
      const generatedSignature256 = createHmac("sha256", appSecret)
        .update(bodyString)
        .digest("hex");

      const isAuthentic256 = xHubSignature256 === generatedSignature256;
      this._logger?.debug(
        `Comparing SHA-256 signatures for integrity check: "${xHubSignature256}" === "${generatedSignature256}" (${isAuthentic256})`,
      );

      const generatedSignature1 = createHmac("sha1", appSecret)
        .update(bodyString)
        .digest("hex");

      const isAuthentic1 = xHubSignature1 === generatedSignature1;
      this._logger?.debug(
        `Comparing SHA-1 signatures for integrity check: "${xHubSignature1}" === "${generatedSignature1}" (${isAuthentic1})`,
      );

      return isAuthentic256;
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
        return;
      },

      /**
       * @inheritdoc
       */
      reject: () => {
        this._logger?.debug("Rejecting Webhook Event Notification");
        return;
      },
    };
  }
}
