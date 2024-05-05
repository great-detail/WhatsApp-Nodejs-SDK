/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { randomBytes } from "node:crypto";
import AbstractAPI, { AbstractAPIParameters } from "../API/AbstractAPI.js";
import CloudAPIMedia from "./CloudAPIMedia/index.js";
import CloudAPIMessage, {
  CloudAPIMessageParameters,
} from "./CloudAPIMessage/index.js";
import CloudAPIWebhook from "./CloudAPIWebhook/index.js";

export interface WhatsAppAPIParameters extends AbstractAPIParameters {}

export interface WhatsAppAPICreateVerifyTokenParameters {
  /**
   * The length of the verify token.
   *
   * @since 5.1.0
   * @default 16
   */
  length?: number;

  /**
   * The encoding of the verify token.
   *
   * @since 5.1.0
   * @default hex
   */
  encoding?: BufferEncoding;

  /**
   * Random Bytes Generation.
   *
   * @since 5.1.0
   * @default crypto.randomBytes
   */
  random?: (length: number) => Buffer;
}

/**
 * WhatsApp Cloud API SDK.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 * @example
 * // SDK instantiation
 * const sdk = new CloudAPI()
 */
export default class CloudAPI extends AbstractAPI {
  /**
   * Default Verify Token Length.
   *
   * @since 5.6.0
   */
  public static DEFAULT_VERIFY_TOKEN_LENGTH = 16;

  /**
   * Default Verify Token Encoding.
   *
   * @since 5.6.0
   */
  public static DEFAULT_VERIFY_TOKEN_ENCODING: BufferEncoding = "hex";

  /**
   * Webhook API.
   * Receive and handle messages from WhatsApp via WebHook.
   *
   * @since 4.0.0
   */
  public webhook: CloudAPIWebhook;

  /**
   * Media API.
   *
   * @example
   * // Upload Media
   * const upload = sdk.media({ businessID: "123456" })
   *   .upload(file);
   * const uploadReceipt = await upload.send();
   * console.log(uploadReceipt);
   */
  public media;

  constructor(parameters: WhatsAppAPIParameters = {}) {
    super(parameters);
    this.webhook = new CloudAPIWebhook(parameters);
    this.media = new CloudAPIMedia(parameters);
  }

  /**
   * Message API.
   *
   * @example
   * // Send a Text Message
   * const message = sdk.message({ businessID: "123456" })
   *   .text({ body: "Hello"}, { toNumber: "1234567890" });
   * const sendReceipt = await message.send();
   * console.log(sendReceipt);
   */
  public message(parameters: CloudAPIMessageParameters) {
    return new CloudAPIMessage({ ...parameters });
  }

  /**
   * Create a new Verify Token.
   * This is a random string that is used to verify that the request is coming
   * from WhatsApp. This method **only** creates the value, it's usage is up to
   * the implementer.
   *
   * @since 5.6.0
   */
  public static createVerifyToken({
    length = this.DEFAULT_VERIFY_TOKEN_LENGTH,
    encoding = this.DEFAULT_VERIFY_TOKEN_ENCODING,
    random = randomBytes,
  }: WhatsAppAPICreateVerifyTokenParameters = {}): string {
    return random(length).toString(encoding);
  }
}
