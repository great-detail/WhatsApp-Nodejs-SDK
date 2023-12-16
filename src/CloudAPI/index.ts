/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParams } from "../API/AbstractAPI";
import CloudAPIInvalidParamError from "./CloudAPIInvalidParamError";
import CloudAPIMessage, {
  CloudAPIMessageParams as BaseCloudAPIMessageParams,
} from "./CloudAPIMessage";
import CloudAPIWebhook from "./CloudAPIWebhook";

export interface WhatsAppAPIParams extends AbstractAPIParams {}

export interface CloudAPIMessageParams
  extends Partial<BaseCloudAPIMessageParams> {}

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

  constructor(params: WhatsAppAPIParams) {
    super(params);
    this.webhook = new CloudAPIWebhook(params);
  }

  /**
   * Message API.
   *
   * @since 6.0.0
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
    ...params
  }: CloudAPIMessageParams = {}) {
    const businessID = overrideBusinessID ?? this._businessID;
    if (!businessID) {
      throw new CloudAPIInvalidParamError("Business ID is required");
    }

    return new CloudAPIMessage({
      logger: logger ?? this._logger,
      businessID,
      ...params,
    });
  }
}
