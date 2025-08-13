/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { KyInstance, Options as KyOptions } from "ky";
import { BusinessAccountID } from "../types/WhatsappBusinessAccount/index.js";
import {
  CreateSubscriptionOptions,
  CreateSubscriptionPayload,
  ListSubscriptionsOptions,
  ListSubscriptionsPayload,
} from "../types/SubscribedApps/index.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class SubscribedApps {
  constructor(protected _transport: KyInstance) {}

  protected getEndpoint(businessAccountID: BusinessAccountID) {
    return encodeURIComponent(businessAccountID) + "/subscribed_apps";
  }

  public createSubscription({
    businessAccountID,
    request,
  }: MethodOptions & CreateSubscriptionOptions) {
    return this._transport.extend({
      method: "POST",
    })<CreateSubscriptionPayload>(this.getEndpoint(businessAccountID), request);
  }

  public listSubscriptions({
    businessAccountID,
    request,
  }: MethodOptions & ListSubscriptionsOptions) {
    return this._transport.extend({
      method: "GET",
    })<ListSubscriptionsPayload>(this.getEndpoint(businessAccountID), request);
  }
}
