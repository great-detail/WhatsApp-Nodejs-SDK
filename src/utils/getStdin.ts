/**
 * Great Detail Support System.
 *
 * @copyright 2025 Great Detail Ltd
 * @author    Great Detail Ltd <info@greatdetail.com>
 * @author    Dom Webber <dom.webber@greatdetail.com>
 * @see       https://greatdetail.com
 */

import { stdin } from "node:process";

async function getStdinBuffer() {
  if (stdin.isTTY) return Buffer.alloc(0);

  const result = [];
  let length = 0;
  for await (const chunk of stdin) {
    result.push(chunk);
    length += chunk.length;
  }

  return Buffer.concat(result, length);
}

export default async function getStdin() {
  const buffer = await getStdinBuffer();
  return buffer.toString();
}
