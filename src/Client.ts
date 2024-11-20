/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import Media from "./Media/index.js";
import Message from "./Message/index.js";
import Webhook from "./Webhook/index.js";
import type { Options as KyOptions } from "ky";

export interface Options {
  accessToken?: string;
  prefixUrl?: string;
  graphVersion?: `v${string}` | (string & NonNullable<unknown>);
}

export default class Client {
  protected _request: KyOptions;

  public message: Message;
  public media: Media;
  public webhook: Webhook;

  constructor({
    accessToken = process.env.WHATSAPP_ACCESS_TOKEN,
    prefixUrl = "https://graph.facebook.com",
    graphVersion = "v20.0",
  }: Options = {}) {
    if (!accessToken) {
      throw new Error(
        "No access token set in process.env.WHATSAPP_ACCESS_TOKEN",
      );
    }

    this._request = {
      prefixUrl: prefixUrl.replace(/\/$/, "") + graphVersion,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    this.message = new Message(this._request);
    this.media = new Media(this._request);
    this.webhook = new Webhook();
  }
}
