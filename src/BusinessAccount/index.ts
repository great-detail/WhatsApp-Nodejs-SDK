/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { KyInstance, Options as KyOptions } from "ky";
import {
  BusinessAccountID,
  GetBusinessAccountOptions,
  GetBusinessAccountPayload,
} from "../types/BusinessAccount/index.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class BusinessAccount {
  constructor(protected _transport: KyInstance) {}

  public get(
    businessAccountID: BusinessAccountID,
    { fields, request }: MethodOptions & GetBusinessAccountOptions = {},
  ) {
    return this._transport.extend({
      method: "GET",
      searchParams: {
        ...(fields
          ? {
              fields: fields.join(","),
            }
          : {}),
      },
    })<GetBusinessAccountPayload>(
      encodeURIComponent(businessAccountID),
      request,
    );
  }
}
