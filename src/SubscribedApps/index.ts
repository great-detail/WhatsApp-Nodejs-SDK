/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import ky, { Options as KyOptions } from "ky";
import { BusinessAccountID } from "../types/BusinessAccount.js";
import { CreateSubscriptionOptions, CreateSubscriptionPayload, ListSubscriptionsOptions, ListSubscriptionsPayload } from "../types/SubscribedApps/index.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class SubscribedApps {
  constructor(protected _request: KyOptions) {}

  protected getEndpoint(businessAccountID: BusinessAccountID) {
    return encodeURIComponent(businessAccountID) + "/subscribed_apps";
  }

  public createSubscription({
    businessAccountID,
    request,
  }: MethodOptions & CreateSubscriptionOptions) {
    return ky.create({
      ...this._request,
      method: "POST",
    })<CreateSubscriptionPayload>(
      this.getEndpoint(businessAccountID),
      request,
    );
  }

  public listSubscriptions({
    businessAccountID,
    request,
  }: MethodOptions & ListSubscriptionsOptions) {
    return ky.create({
      ...this._request,
      method: "GET",
    })<ListSubscriptionsPayload>(
      this.getEndpoint(businessAccountID),
      request,
    );
  }
}
