/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import ky, { Options as KyOptions } from "ky";
import { BusinessAccountID } from "../types/BusinessAccount.js";
import {
  GetPhoneNumberFields,
  GetPhoneNumberOptions,
  GetPhoneNumberPayload,
  ListPhoneNumbersOptions,
  ListPhoneNumbersPaylod,
} from "../types/PhoneNumbers/index.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class PhoneNumbers {
  constructor(protected _request: KyOptions) {}

  public getEndpoint(businessAccountID: BusinessAccountID) {
    return encodeURIComponent(businessAccountID) + "/phone_numbers";
  }

  public getPhoneNumber<Fields extends GetPhoneNumberFields = object>({
    phoneNumberID,
    fields,
    request,
  }: MethodOptions & GetPhoneNumberOptions) {
    return ky.create({
      ...this._request,
      method: "GET",
      searchParams: {
        fields: Object.keys(fields ?? {}).join(","),
      },
    })<GetPhoneNumberPayload<Fields>>(
      encodeURIComponent(phoneNumberID),
      request,
    );
  }

  public listPhoneNumbers({
    businessAccountID,
    sort,
    filtering,
    request,
  }: MethodOptions & ListPhoneNumbersOptions) {
    return ky.create({
      ...this._request,
      method: "GET",
      searchParams: {
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
}
