/**
 * WhatsApp NodeJS SDK.
 *
 * @author    Great Detail Ltd <info@greatdetail.com>
 * @author    Dom Webber <dom.webber@greatdetail.com>
 * @see       https://greatdetail.com
 */

const encoder = new TextEncoder();
export function strToArrayBuffer(str: string): ArrayBuffer {
  return encoder.encode(str).buffer;
}

export function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
