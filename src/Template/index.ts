/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { KyInstance, Options as KyOptions } from "ky";
import { BusinessAccountID } from "../types/BusinessAccount.js";
import {
  CreateTemplateOptions,
  CreateTemplatePayload,
} from "../types/Templates/index.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class Template {
  constructor(protected _transport: KyInstance) {}

  protected getEndpoint(businessAccountID: BusinessAccountID) {
    return encodeURIComponent(businessAccountID) + "/message_templates";
  }

  public create({
    businessAccountID,
    request,
    ...template
  }: MethodOptions & CreateTemplateOptions) {
    return this._transport.extend({
      method: "POST",
      json: template,
    })<CreateTemplatePayload>(this.getEndpoint(businessAccountID), request);
  }
}
