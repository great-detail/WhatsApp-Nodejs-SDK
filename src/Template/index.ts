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
  DeleteTemplateOptions,
  DeleteTemplatePayload,
} from "../types/Templates/index.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class Template {
  constructor(protected _transport: KyInstance) {}

  protected getEndpoint(businessAccountID: BusinessAccountID) {
    return encodeURIComponent(businessAccountID) + "/message_templates";
  }

  /**
   * Create a Template.
   *
   * ```ts
   * const { success } = await sdk.template.create(
   *   "123...456",
   *   {
   *     name: "example_template_1",
   *     library_template_name: "hello_world_1",
   *     category: "UTILITY",
   *     language: "en_US",
   *   }
   * );
   * ```
   */
  public create(
    businessAccountID: BusinessAccountID,
    { request, ...template }: MethodOptions & CreateTemplateOptions,
  ) {
    return this._transport.extend({
      method: "POST",
      json: template,
    })<CreateTemplatePayload>(this.getEndpoint(businessAccountID), request);
  }

  /**
   * Delete a Template.
   *
   * ```ts
   * const { success } = await sdk.template.delete(
   *   "123...456",
   *   {
   *     hsm_id: "optional-template-id",
   *     name: "required-template-name",
   *   }
   * );
   * ```
   */
  delete(
    businessAccountID: BusinessAccountID,
    { request, ...template }: MethodOptions & DeleteTemplateOptions,
  ) {
    return this._transport.extend({
      method: "DELETE",
      searchParams: template,
    })<DeleteTemplatePayload>(this.getEndpoint(businessAccountID), request);
  }
}
