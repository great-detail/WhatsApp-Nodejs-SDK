/**
 * WhatsApp NodeJS SDK.
 *
 * @author    Great Detail Ltd <info@greatdetail.com>
 * @author    Dom Webber <dom.webber@greatdetail.com>
 * @see       https://greatdetail.com
 */

import Client from "../../dist/index.js";
import { assertEquals } from "@std/assert";

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

Deno.test(async function run() {
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

  assertEquals(result.eventNotification as unknown, bodyObject);
  assertEquals(result.signature.sha256.value, sig256);
  assertEquals(result.signature.sha1.value, sig1);
});
