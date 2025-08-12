/**
 * WhatsApp NodeJS SDK.
 *
 * @author    Great Detail Ltd <info@greatdetail.com>
 * @author    Dom Webber <dom.webber@greatdetail.com>
 * @see       https://greatdetail.com
 */

import { expect, test } from "bun:test";
import Client from "../../dist/index";

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

  return Array.from(new Uint8Array(sig))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

test("Webhook.eventNotification: returns eventNotification and signature helpers", async () => {
  const appSecret = "supersecret";
  const bodyObject = { foo: "bar" };
  const body = JSON.stringify(bodyObject);
  const sig256 = await hmacHex("sha256", appSecret, body);
  const sig1 = await hmacHex("sha1", appSecret, body);

  const req = {
    method: "POST",
    query: {},
    headers: {
      "x-hub-signature-256": "sha256=" + sig256,
      "x-hub-signature": "sha1=" + sig1,
    },
    body,
  };

  const result = await new Client().webhook.eventNotification(req);

  expect(result.eventNotification as unknown).toEqual(bodyObject);
  expect(result.signature.sha256.value).toBe(sig256);
  expect(result.signature.sha1.value).toBe(sig1);

  // Check signature helpers
  expect(await result.signature.sha256.check(appSecret)).toBe(true);
  expect(await result.signature.sha1.check(appSecret)).toBe(true);
  expect(await result.checkSignature(appSecret)).toBe(true);

  // Accept returns undefined
  expect(result.accept()).toBeUndefined();
});
