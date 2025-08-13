/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { KyInstance, Options as KyOptions } from "ky";
import { WhatsappBusinessAccountID } from "../types/WhatsappBusinessAccount/index.js";
import {
  GetPhoneNumberOptions,
  GetPhoneNumberPayload,
  ListPhoneNumbersOptions,
  ListPhoneNumbersPaylod,
  UpdatePhoneNumberOptions,
  UpdatePhoneNumberPayload,
} from "../types/PhoneNumbers/index.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class PhoneNumbers {
  constructor(protected _transport: KyInstance) {}

  public getEndpoint(businessAccountID: WhatsappBusinessAccountID) {
    return encodeURIComponent(businessAccountID) + "/phone_numbers";
  }

  public getPhoneNumber({
    phoneNumberID,
    fields,
    request,
  }: MethodOptions & GetPhoneNumberOptions) {
    return this._transport.extend({
      method: "GET",
      searchParams: {
        ...(fields
          ? {
              fields: fields
                .map((field) =>
                  Array.isArray(field)
                    ? `${field[0]}{${field[1].join(",")}}`
                    : field,
                )
                .join(","),
            }
          : {}),
      },
    })<GetPhoneNumberPayload>(encodeURIComponent(phoneNumberID), request);
  }

  public listPhoneNumbers({
    businessAccountID,
    sort,
    filtering,
    fields,
    request,
  }: MethodOptions & ListPhoneNumbersOptions) {
    return this._transport.extend({
      method: "GET",
      searchParams: {
        ...(fields
          ? {
              fields: fields
                .map((field) =>
                  Array.isArray(field)
                    ? `${field[0]}{${field[1].join(",")}}`
                    : field,
                )
                .join(","),
            }
          : {}),
        ...(sort
          ? {
              sort,
            }
          : {}),
        ...(filtering
          ? {
              filtering,
            }
          : {}),
      },
    })<ListPhoneNumbersPaylod>(this.getEndpoint(businessAccountID), request);
  }

  public updatePhoneNumber({
    phoneNumberID,
    new_display_name,
    request,
  }: MethodOptions & UpdatePhoneNumberOptions) {
    return this._transport.extend({
      method: "POST",
      searchParams: {
        ...(new_display_name ? { new_display_name } : {}),
      },
    })<UpdatePhoneNumberPayload>(encodeURIComponent(phoneNumberID), request);
  }
}
