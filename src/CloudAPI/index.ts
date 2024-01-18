/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParameters } from "../API/AbstractAPI.js";
import CloudAPIInvalidParameterError from "./CloudAPIInvalidParameterError.js";
import CloudAPIMedia, {
  CloudAPIMediaParameters,
} from "./CloudAPIMedia/index.js";
import CloudAPIMessage, {
  CloudAPIMessageParameters as BaseCloudAPIMessageParameters,
} from "./CloudAPIMessage/index.js";
import CloudAPIWebhook from "./CloudAPIWebhook/index.js";

export interface WhatsAppAPIParameters extends AbstractAPIParameters {}

export interface CloudAPIMessageParameters
  extends Partial<BaseCloudAPIMessageParameters> {}

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
   * Webhook API.
   * Receive and handle messages from WhatsApp via WebHook.
   *
   * @since 4.0.0
   */
  public webhook: CloudAPIWebhook;

  constructor(parameters: WhatsAppAPIParameters = {}) {
    super(parameters);
    this.webhook = new CloudAPIWebhook(parameters);
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
  public message({
    businessID: overrideBusinessID,
    logger,
    ...parameters
  }: CloudAPIMessageParameters = {}) {
    const businessID = overrideBusinessID ?? this._businessID;
    if (!businessID) {
      throw new CloudAPIInvalidParameterError("Business ID is required");
    }

    return new CloudAPIMessage({
      logger: logger ?? this._logger,
      businessID,
      ...parameters,
    });
  }

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
  public media({
    businessID: overrideBusinessID,
    logger,
    ...parameters
  }: CloudAPIMediaParameters = {}) {
    const businessID = overrideBusinessID ?? this._businessID;
    if (!businessID) {
      throw new CloudAPIInvalidParameterError("Business ID is required");
    }

    return new CloudAPIMedia({
      logger: logger ?? this._logger,
      businessID,
      ...parameters,
    });
  }
}
