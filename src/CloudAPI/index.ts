/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParams } from "../API/AbstractAPI";
import CloudAPIMessage from "./CloudAPIMessage";
import CloudAPIWebhook from "./CloudAPIWebhook";
import { randomBytes } from "crypto";

export interface WhatsAppAPICreateVerifyTokenParams {
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

export interface WhatsAppAPIParams extends AbstractAPIParams {}

/**
 * WhatsApp Cloud API SDK.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 * @example
 * // SDK instantiation
 * const sdk = new CloudAPI("123456")
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
   * Message API.
   *
   * @since 5.5.0
   * @example
   * // Send a Text Message
   * const message = sdk.message.text({ body: "Hello"}, { toNumber: "1234567890" });
   * const sendReceipt = await message.send();
   * console.log(sendReceipt);
   */
  public message: CloudAPIMessage;

  /**
   * Webhook API.
   * Receive and handle messages from WhatsApp via WebHook.
   *
   * @since 4.0.0
   */
  public webhook: CloudAPIWebhook;

  constructor(params: WhatsAppAPIParams) {
    super(params);
    this.message = new CloudAPIMessage(params);
    this.webhook = new CloudAPIWebhook(params);
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
  }: WhatsAppAPICreateVerifyTokenParams = {}): string {
    return random(length).toString(encoding);
  }
}
