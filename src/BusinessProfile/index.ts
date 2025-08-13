/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { KyInstance, Options as KyOptions } from "ky";
import {
  GetBusinessProfileOptions,
  GetBusinessProfilePayload,
  UpdateBusinessProfileOptions,
  UpdateBusinessProfilePayload,
} from "../types/BusinessProfile/index.js";
import { PhoneNumberID } from "../types/PhoneNumber.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class BusinessProfile {
  constructor(protected _transport: KyInstance) {}

  protected getEndpoint(phoneNumberID: PhoneNumberID) {
    return encodeURIComponent(phoneNumberID) + "/whatsapp_business_profile";
  }

  public getBusinessProfile({
    phoneNumberID,
    fields,
    request,
  }: MethodOptions & GetBusinessProfileOptions) {
    return this._transport.extend({
      method: "GET",
      searchParams: {
        ...(fields
          ? {
              fields: Array.isArray(fields)
                ? fields.join(",")
                : Object.keys(fields ?? {}).join(","),
            }
          : {}),
      },
    })<GetBusinessProfilePayload>(this.getEndpoint(phoneNumberID), request);
  }

  public updateBusinessProfile({
    phoneNumberID,
    request,
    ...json
  }: MethodOptions & UpdateBusinessProfileOptions) {
    return this._transport.extend({
      method: "POST",
      json: {
        messaging_product: "whatsapp",
        ...json,
      },
    })<UpdateBusinessProfilePayload>(this.getEndpoint(phoneNumberID), request);
  }
}
