/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { AccountID } from "../ID.js";
import APIInterface from "./APIInterface.js";
import { randomBytes } from "crypto";
import type { Logger } from "winston";

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

export interface AbstractAPIParams {
  businessID?: AccountID;
  logger?: Logger;
}

/**
 * Abstract API.
 * Provides some of the common functionality for the API classes, including
 * those that are likely to be reused such as endpoint construction.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default abstract class AbstractAPI implements APIInterface {
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
   * Business ID.
   *
   * @since 2.0.0
   */
  protected _businessID?: AccountID;
  protected _logger?: Logger;

  constructor({ logger, businessID }: AbstractAPIParams) {
    this._logger = logger;
    this._businessID = businessID;
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
