/**
 * WhatsApp NodeJS SDK.
 *
 * @author    Great Detail Ltd <info@greatdetail.com>
 * @author    Dom Webber <dom.webber@greatdetail.com>
 * @see       https://greatdetail.com
 */

import { test } from "node:test";
import assert from "node:assert";
import Webhook, { IncomingRequest } from "../Webhook/index.js";
import IncorrectMethodWebhookError from "../Webhook/WebhookError/IncorrectMethodWebhookError.js";
import InvalidHubModeWebhookError from "../Webhook/WebhookError/InvalidHubModeWebhookError.js";
import InvalidHubChallengeWebhookError from "../Webhook/WebhookError/InvalidHubChallengeWebhookError.js";
import InvalidHubVerifyTokenWebhookError from "../Webhook/WebhookError/InvalidHubVerifyTokenWebhookError.js";
import InvalidHubSignatureWebhookError from "../Webhook/WebhookError/InvalidHubSignatureWebhookError.js";
import MissingBodyWebhookError from "../Webhook/WebhookError/MissingBodyWebhookError.js";

// Helper to generate HMAC signatures for test
async function hmacHex(
  alg: "sha1" | "sha256",
  secret: string,
  body: string,
): Promise<string> {
  const algo = alg === "sha1" ? "SHA-1" : "SHA-256";
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: { name: algo } },
    false,
    ["sign"],
  );
  const sig = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(body),
  );
  return Buffer.from(sig).toString("hex");
}

test("Webhook.register: success returns challenge and verifyToken", async () => {
  const webhook = new Webhook();
  const req: IncomingRequest = {
    method: "GET",
    query: {
      "hub.mode": "subscribe",
      "hub.challenge": "challenge123",
      "hub.verify_token": "token456",
    },
    headers: {},
  };
  const result = await webhook.register(req);
  assert.equal(result.verifyToken, "token456");
  assert.equal(result.challenge, "challenge123");
  assert.equal(result.accept(), "challenge123");
  assert.equal(typeof result.reject, "function");
});

test("Webhook.register: throws on non-GET method", async () => {
  const webhook = new Webhook();
  const req: IncomingRequest = {
    method: "POST",
    query: {
      "hub.mode": "subscribe",
      "hub.challenge": "challenge",
      "hub.verify_token": "token",
    },
    headers: {},
  };
  await assert.rejects(
    () => webhook.register(req),
    IncorrectMethodWebhookError,
  );
});

test("Webhook.register: throws on missing hub.mode", async () => {
  const webhook = new Webhook();
  const req: IncomingRequest = {
    method: "GET",
    query: {
      "hub.challenge": "challenge",
      "hub.verify_token": "token",
    },
    headers: {},
  };
  await assert.rejects(() => webhook.register(req), InvalidHubModeWebhookError);
});

test("Webhook.register: throws on hub.mode not subscribe", async () => {
  const webhook = new Webhook();
  const req: IncomingRequest = {
    method: "GET",
    query: {
      "hub.mode": "unsubscribe",
      "hub.challenge": "challenge",
      "hub.verify_token": "token",
    },
    headers: {},
  };
  await assert.rejects(() => webhook.register(req), InvalidHubModeWebhookError);
});

test("Webhook.register: throws on missing hub.challenge", async () => {
  const webhook = new Webhook();
  const req: IncomingRequest = {
    method: "GET",
    query: {
      "hub.mode": "subscribe",
      "hub.verify_token": "token",
    },
    headers: {},
  };
  await assert.rejects(
    () => webhook.register(req),
    InvalidHubChallengeWebhookError,
  );
});

test("Webhook.register: throws on missing hub.verify_token", async () => {
  const webhook = new Webhook();
  const req: IncomingRequest = {
    method: "GET",
    query: {
      "hub.mode": "subscribe",
      "hub.challenge": "challenge",
    },
    headers: {},
  };
  await assert.rejects(
    () => webhook.register(req),
    InvalidHubVerifyTokenWebhookError,
  );
});

test("Webhook.eventNotification: throws on non-POST method", async () => {
  const webhook = new Webhook();
  const req: IncomingRequest = {
    method: "GET",
    query: {},
    headers: {
      "x-hub-signature-256": "sha256=abc",
    },
    body: "{}",
  };
  await assert.rejects(
    () => webhook.eventNotification(req),
    IncorrectMethodWebhookError,
  );
});

test("Webhook.eventNotification: throws on missing x-hub-signature-256", async () => {
  const webhook = new Webhook();
  const req: IncomingRequest = {
    method: "POST",
    query: {},
    headers: {},
    body: "{}",
  };
  await assert.rejects(
    () => webhook.eventNotification(req),
    InvalidHubSignatureWebhookError,
  );
});

test("Webhook.eventNotification: throws on missing body", async () => {
  const webhook = new Webhook();
  const req: IncomingRequest = {
    method: "POST",
    query: {},
    headers: {
      "x-hub-signature-256": "sha256=abc",
    },
  };
  await assert.rejects(
    () => webhook.eventNotification(req),
    MissingBodyWebhookError,
  );
});

test("Webhook.eventNotification: returns eventNotification and signature helpers", async () => {
  const webhook = new Webhook();
  const appSecret = "supersecret";
  const body = JSON.stringify({ foo: "bar" });
  const sig256 = await hmacHex("sha256", appSecret, body);
  const sig1 = await hmacHex("sha1", appSecret, body);

  const req: IncomingRequest = {
    method: "POST",
    query: {},
    headers: {
      "x-hub-signature-256": "sha256=" + sig256,
      "x-hub-signature": "sha1=" + sig1,
    },
    body,
  };

  const result = await webhook.eventNotification(req);

  assert.deepEqual(result.eventNotification, { foo: "bar" });
  assert.equal(result.signature.sha256.value, sig256);
  assert.equal(result.signature.sha1.value, sig1);

  // Check signature helpers
  assert.equal(await result.signature.sha256.check(appSecret), true);
  assert.equal(await result.signature.sha1.check(appSecret), true);
  assert.equal(await result.checkSignature(appSecret), true);

  // Accept returns undefined
  assert.equal(result.accept(), undefined);
});

test("Webhook.eventNotification: verifySignature throws on invalid signature", async () => {
  const webhook = new Webhook();
  const body = JSON.stringify({ foo: "bar" });
  const req: IncomingRequest = {
    method: "POST",
    query: {},
    headers: {
      "x-hub-signature-256": "sha256=deadbeef",
    },
    body,
  };
  const result = await webhook.eventNotification(req);
  await assert.rejects(
    () => result.verifySignature("wrongsecret"),
    InvalidHubSignatureWebhookError,
  );
});
