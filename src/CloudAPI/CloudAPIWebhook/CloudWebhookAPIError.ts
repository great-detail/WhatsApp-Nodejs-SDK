/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export default class CloudAPIWebhookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CloudAPIWebhookError";
  }

  /**
   * Invalid URL.
   * This error occurs when the request URL is not valid. This includes when
   * the value of `req.url` is omitted.
   *
   * @since 5.0.0
   */
  public static invalidURL() {
    return new this("Request URL could not be parsed");
  }

  /**
   * Invalid Hub Mode.
   * This error occurs when the `hub.mode` query parameter is not set to the
   * value of `subscribe`, including if the value is unset.
   *
   * @since 5.0.0
   */
  public static invalidHubMode(hubMode?: string) {
    return new this(
      `"${hubMode}" is not a supported hub.mode value in request`,
    );
  }

  /**
   * Invalid Hub Challenge.
   * This error occurs when the `hub.challenge` query parameter is not set to a
   * valid value, including if the value is unset.
   *
   * @since 5.0.0
   */
  public static invalidHubChallenge(hubChallenge?: string) {
    return new this(
      `"${hubChallenge}" is not a valid value for hub.challenge in request`,
    );
  }

  /**
   * Invalid Hub Verify Token.
   * This error occurs when the `hub.verify_token` query parameter is not set
   * to a valid value, including if the value is unset. This error does not
   * occur in relation to checking whether the value matches your own verify
   * token.
   *
   * @since 5.0.0
   */
  public static invalidVerifyToken() {
    return new this(`Value for hub.verify_token in request is not valid`);
  }

  /**
   * Excessive Request Body Size.
   * This error occurs when the request body exceeds the maximum size of 1MB.
   * This is the maximum size allowed by WhatsApp.
   *
   * @since 5.0.0
   */
  public static excessiveRequestBodySize() {
    return new this("Request body exceeds 1MB maximum size");
  }

  /**
   * Invalid X-Hub-Signature Header.
   * This error occurs when the `X-Hub-Signature` header is not set or is not
   * valid. This error does not occur in relation to checking the signature's
   * integrity.
   *
   * @since 5.0.0
   */
  public static invalidXHubSignature() {
    return new this("X-Hub-Signature header is not valid");
  }

  /**
   * Mismatched X-Hub-Signature Header.
   * This error occurs when the `X-Hub-Signature` header is set but does not
   * match the calculated signature for the request body.
   *
   * @since 5.0.0
   */
  public static mismatchedXHubSignature() {
    return new this(
      "X-Hub-Signature header does not match calculated signature for the request body",
    );
  }
}
