/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import ky from "ky";
import BusinessProfile from "./BusinessProfile/index.js";
import Media from "./Media/index.js";
import Message from "./Message/index.js";
import PhoneNumbers from "./PhoneNumbers/index.js";
import SubscribedApps from "./SubscribedApps/index.js";
import Webhook from "./Webhook/index.js";
import type { KyInstance, Options as KyOptions } from "ky";

export interface Options {
  prefixUrl?: string;
  graphVersion?: `v${string}` | (string & NonNullable<unknown>);
  request?: Omit<KyOptions, "prefixUrl">;
}

/**
 * The (Unofficial) WhatsApp SDK.
 *
 * ```ts
 * // Instantiate the SDK Client
 * const sdk = new Client({
 *   request: {
 *     headers: { Authorization: "Bearer ..." },
 *   },
 * });
 *
 * // Use it!
 * const message = await sdk.message.createMessage({
 *   phoneNumberID: "123...809",
 *   to: "1234567890",
 *   type: "text",
 *   text: { body: "Hello" },
 * });
 * ```
 *
 * @see https://github.com/great-detail/WhatsApp-JS-SDK
 */
export default class Client {
  public static DEFAULT_GRAPH_BASE_URL = "https://graph.facebook.com";
  public static DEFAULT_GRAPH_VERSION = "v23.0";

  protected _transport: KyInstance;

  /** Business-Profile APIs */
  public businessProfile: BusinessProfile;

  /** Messaging APIs */
  public message: Message;

  /** Phone Number APIs */
  public phoneNumbers: PhoneNumbers;

  /** Subscribed App APIs */
  public subscribedApps: SubscribedApps;

  /** Media APIs */
  public media: Media;

  /** Webhook APIs */
  public webhook: Webhook;

  constructor({
    prefixUrl = Client.DEFAULT_GRAPH_BASE_URL,
    graphVersion = Client.DEFAULT_GRAPH_VERSION,
    request,
  }: Options = {}) {
    this._transport = ky.create({
      ...request,
      prefixUrl: prefixUrl.replace(/\/$/, "") + "/" + graphVersion,
    });

    this.businessProfile = new BusinessProfile(this._transport);
    this.message = new Message(this._transport);
    this.phoneNumbers = new PhoneNumbers(this._transport);
    this.subscribedApps = new SubscribedApps(this._transport);
    this.media = new Media(this._transport);
    this.webhook = new Webhook();
  }
}
