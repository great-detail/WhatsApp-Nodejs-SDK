/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { createHmac } from "node:crypto";
import { WebhookEventNotification } from "../types/Webhook/WebhookEventNotification.js";
import IncorrectMethodWebhookError from "./WebhookError/IncorrectMethodWebhookError.js";
import WebhookError from "./WebhookError/index.js";
import InvalidHubChallengeWebhookError from "./WebhookError/InvalidHubChallengeWebhookError.js";
import InvalidHubModeWebhookError from "./WebhookError/InvalidHubModeWebhookError.js";
import InvalidHubSignatureWebhookError from "./WebhookError/InvalidHubSignatureWebhookError.js";
import InvalidHubVerifyTokenWebhookError from "./WebhookError/InvalidHubVerifyTokenWebhookError.js";
import MissingBodyWebhookError from "./WebhookError/MissingBodyWebhookError.js";

export interface IncomingRequest {
  method: string;
  query: Record<string, string>;
  body?: string;
  headers: Record<string, string>;
}

export default class Webhook {
  public errors = {
    WebhookError,
    IncorrectMethodWebhookError,
    InvalidHubChallengeWebhookError,
    InvalidHubModeWebhookError,
    InvalidHubSignatureWebhookError,
    InvalidHubVerifyTokenWebhookError,
    MissingBodyWebhookError,
  };

  /**
   * Handle a Registration Webhook Request.
   * The handler for `GET` requests to your webhook endpoint. A registration
   * request is when WhatsApp sends a GET request to your webhook endpoint to
   * verify that it is valid. The challenge should be returned if valid.
   *
   * **ExpressJS**:
   *
   * ```ts
   * app.get(
   *   "/path/to/webhook",
   *   async (req, res) => {
   *     const reg = await sdk.webhook.register({
   *       method: request.method,
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
   * ```
   *
   * **Fastify**:
   *
   * ```ts
   * fastify.route({
   *   method: "GET",
   *   url: "/path/to/webhook",
   *   handler: (request, reply) => {   *
   *     const reg = await sdk.webhook.register({
   *       method: request.method,
   *       query: request.query,
   *       body: undefined,
   *       headers: request.headers,
   *     });
   *     // DIY: Check the reg.verifyToken value
   *     if (reg.verifyToken !== "abcd") {
   *       return reply.send(reg.reject());
   *     }
   *     return reply.send(reg.accept());
   *   }
   * });
   * ```
   *
   * @throws {WebhookError}
   */
  public async register(request: IncomingRequest) {
    if (request.method.toLowerCase() !== "get") {
      throw new IncorrectMethodWebhookError(
        "Webhook Registration Requests must use the GET request method.",
      );
    }

    const hubMode = request.query["hub.mode"] ?? undefined;
    if (!hubMode || hubMode !== "subscribe") {
      throw new InvalidHubModeWebhookError(
        "Webhook Registration Request must have query parameter: hub.mode=subscribe",
      );
    }

    const hubChallenge = request.query["hub.challenge"] ?? undefined;
    if (!hubChallenge) {
      throw new InvalidHubChallengeWebhookError(
        "Webhook Registration Request must have query parameter: hub.challenge",
      );
    }

    const hubVerifyToken = request.query["hub.verify_token"] ?? undefined;
    if (!hubVerifyToken) {
      throw new InvalidHubVerifyTokenWebhookError(
        "Webhook Registration Request must have query parameter: hub.verify_token",
      );
    }

    return {
      verifyToken: hubVerifyToken,
      challenge: hubChallenge,
      accept: () => hubChallenge,
      reject: () => {},
    };
  }

  /**
   * Handle an Event Notification Webhook Request.
   * The handler for `POST` requests to your webhook endpoint.
   *
   * **ExpressJS**:
   *
   * ```ts
   * app.use(express.raw()); // Important <-
   * app.post(
   *   "/path/to/webhook",
   *   async (req, res) => {
   *     const event = sdk.webhook.eventNotification({
   *       method: request.method,
   *       query: req.query,
   *       body: req.body.toString(),
   *       headers: req.headers,
   *     });
   *     // DIY: Load the Meta App Secret
   *     event.verifySignature("abcd-app-secret");
   *     // Non-200 status codes will be retried
   *     // You may want to use the dreaded "successful error"
   *     if (someFailedCondition) {
   *       res.status(400);
   *       return res.end();
   *     }
   *     return res.end(event.accept());
   *   }
   * );
   * ```
   *
   * **Fastify**:
   *
   * ```ts
   * // See: https://github.com/fastify/fastify/issues/707#issuecomment-817224931
   * fastify.addContentTypeParser("application/json", { parseAs: "buffer" }, (_req, body, done) => {
   *   done(null, body);
   * });
   *
   * fastify.route({
   *   method: "POST",
   *   url: "/path/to/webhook",
   *   handler: (request, reply) => {
   *     // This SDK handles inbound webhook requests from a string for signature verification
   *     assert(Buffer.isBuffer(request.body) || typeof request.body === "string");
   *     const body = request.body.toString();
   *
   *     const event = sdk.webhook.eventNotification({
   *       method: request.method,
   *       query: request.query,
   *       body,
   *       headers: request.headers,
   *     });
   *     // DIY: Load the Meta App Secret
   *     event.verifySignature("abcd-app-secret");
   *     // Non-200 status codes will be retried
   *     // You may want to use the dreaded "successful error"
   *     if (someFailedCondition) {
   *       return reply.code(400).send();
   *     }
   *     return reply.send(event.accept());
   *   }
   * });
   * ```
   */
  public async eventNotification(request: IncomingRequest) {
    if (request.method.toLowerCase() !== "post") {
      throw new IncorrectMethodWebhookError(
        "Webhook Event Notification Request must use the POST request method.",
      );
    }

    const xHubSignature1 = request.headers["x-hub-signature"]
      ?.toString()
      .replace("sha1=", "");

    const xHubSignature256 = request.headers["x-hub-signature-256"]
      ?.toString()
      .replace("sha256=", "");
    if (!xHubSignature256) {
      throw new InvalidHubSignatureWebhookError(
        "Webhook Event Notification Request must have header: x-hub-signature-256",
      );
    }

    if (!request.body) {
      throw new MissingBodyWebhookError(
        "Webhook Event Notification Request must have a body",
      );
    }

    // Async request body buffering
    const bodyString = request.body;
    const eventNotification = JSON.parse(
      bodyString,
    ) as WebhookEventNotification;

    // See: https://github.com/WhatsApp/WhatsApp-Nodejs-SDK/blob/58ca3d5fceea604e18393734578d9a7944a37b15/src/utils.ts#L77-L82
    // See: https://developers.facebook.com/docs/messenger-platform/webhooks#validate-payloads
    const getCalculatedSignature = (alg: string) => (appSecret: string) =>
      createHmac(alg, appSecret).update(bodyString, "utf8").digest("hex");

    const checkSignature = (alg: string, signature: string) => {
      const signatureCalculator = getCalculatedSignature(alg);

      return (appSecret: string) => {
        const generatedSignature = signatureCalculator(appSecret);

        const isAuthentic256 = signature === generatedSignature;

        return isAuthentic256;
      };
    };

    return {
      eventNotification,
      signature: {
        sha1: {
          value: xHubSignature1,
          getCalculatedSignature: getCalculatedSignature("sha1"),
          check: checkSignature("sha1", xHubSignature1),
        },
        sha256: {
          value: xHubSignature256,
          getCalculatedSignature: getCalculatedSignature("sha256"),
          check: checkSignature("sha256", xHubSignature256),
        },
      },
      checkSignature: checkSignature("sha256", xHubSignature256),
      verifySignature(appSecret: string) {
        if (!this.checkSignature(appSecret)) {
          throw new InvalidHubSignatureWebhookError(
            "Webhook Event Notification Signature doesn't match received body",
          );
        }
      },
      accept: () => {},
    };
  }
}
