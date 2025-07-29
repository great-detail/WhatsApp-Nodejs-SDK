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

export default class Client {
  protected _transport: KyInstance;

  public businessProfile: BusinessProfile;
  public message: Message;
  public phoneNumbers: PhoneNumbers;
  public subscribedApps: SubscribedApps;
  public media: Media;
  public webhook: Webhook;

  constructor({
    prefixUrl = "https://graph.facebook.com",
    graphVersion = "v23.0",
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
