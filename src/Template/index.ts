/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { KyInstance, Options as KyOptions } from "ky";
import { BusinessAccountID } from "../types/BusinessAccount/index.js";
import {
  CreateTemplateOptions,
  CreateTemplatePayload,
  DeleteTemplateOptions,
  DeleteTemplatePayload,
  GetTemplateOptions,
  GetTemplatePayload,
  ListLibraryTemplatesOptions,
  ListLibraryTemplatesPayload,
  ListTemplatesOptions,
  ListTemplatesPayload,
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
   * Get a Template.
   *
   * ```ts
   * const template = await sdk.template.get(
   *   "123...456",
   *   { fields: { name: true } }
   * );
   * ```
   */
  get(
    templateID: string,
    { fields, request }: MethodOptions & GetTemplateOptions,
  ) {
    return this._transport.extend({
      method: "GET",
      searchParams: {
        ...(fields ? { fields: fields.join(",") } : {}),
      },
    })<GetTemplatePayload>(encodeURIComponent(templateID), request);
  }

  /**
   * List Templates.
   *
   * ```ts
   * const templates = await sdk.template.list(
   *   "123...456",
   *   { fields: { name: true } }
   * );
   * ```
   */
  list(
    businessAccountID: BusinessAccountID,
    {
      name_or_content,
      category,
      language,
      status,
      quality_score,
      limit,
      fields,
      request,
    }: MethodOptions & ListTemplatesOptions,
  ) {
    function singleOrCSV(array: string | string[]): string {
      if (typeof array === "string") return array;
      return array.length === 1 ? array[0] : JSON.stringify(array);
    }

    return this._transport.extend({
      method: "GET",
      searchParams: {
        ...(name_or_content ? { name_or_content } : {}),
        ...(category
          ? {
              category: singleOrCSV(category),
            }
          : {}),
        ...(limit ? { limit: limit.toString() } : {}),
        ...(fields ? { fields: fields.join(",") } : {}),
        ...(language ? { language: singleOrCSV(language) } : {}),
        ...(status ? { status: singleOrCSV(status) } : {}),
        ...(quality_score ? { quality_score: singleOrCSV(quality_score) } : {}),
      },
    })<ListTemplatesPayload>(this.getEndpoint(businessAccountID), request);
  }

  /**
   * List Library Templates.
   *
   * ```ts
   * const libraryTemplates = await sdk.template.listLibrary();
   * ```
   */
  listLibrary({
    search,
    category,
    language,
    topic,
    usecase,
    industry,
    limit,
    request,
  }: MethodOptions & ListLibraryTemplatesOptions) {
    function singleOrCSV(array: string | string[]): string {
      if (typeof array === "string") return array;
      return array.length === 1 ? array[0] : JSON.stringify(array);
    }

    return this._transport.extend({
      method: "GET",
      searchParams: {
        ...(search ? { search } : {}),
        ...(category
          ? {
              category: singleOrCSV(category),
            }
          : {}),
        ...(language ? { language: singleOrCSV(language) } : {}),
        ...(topic ? { topic: singleOrCSV(topic) } : {}),
        ...(usecase ? { usecase: singleOrCSV(usecase) } : {}),
        ...(industry ? { industry: singleOrCSV(industry) } : {}),
        ...(limit ? { limit: limit.toString() } : {}),
      },
    })<ListLibraryTemplatesPayload>("message_template_library", request);
  }

  /**
   * Create a Template.
   *
   * ```ts
   * const { id } = await sdk.template.create(
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
