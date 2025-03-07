/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import BusinessProfile from "./BusinessProfile/index.js";
import Media from "./Media/index.js";
import Message from "./Message/index.js";
import PhoneNumbers from "./PhoneNumbers/index.js";
import SubscribedApps from "./SubscribedApps/index.js";
import Webhook from "./Webhook/index.js";
import type { Options as KyOptions } from "ky";

export interface Options {
  prefixUrl?: string;
  graphVersion?: `v${string}` | (string & NonNullable<unknown>);
}

export default class Client {
  protected _request: KyOptions;

  public businessProfile: BusinessProfile;
  public message: Message;
  public phoneNumbers: PhoneNumbers;
  public subscribedApps: SubscribedApps;
  public media: Media;
  public webhook: Webhook;

  constructor({
    prefixUrl = "https://graph.facebook.com",
    graphVersion = "v20.0",
  }: Options = {}) {
    this._request = {
      prefixUrl: prefixUrl.replace(/\/$/, "") + "/" + graphVersion,
    };

    this.businessProfile = new BusinessProfile(this._request);
    this.message = new Message(this._request);
    this.phoneNumbers = new PhoneNumbers(this._request);
    this.subscribedApps = new SubscribedApps(this._request);
    this.media = new Media(this._request);
    this.webhook = new Webhook();
  }
}
