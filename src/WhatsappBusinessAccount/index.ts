/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { KyInstance, Options as KyOptions } from "ky";
import {
  WhatsappBusinessAccountID,
  GetWhatsappBusinessAccountOptions,
  GetWhatsappBusinessAccountPayload,
} from "../types/WhatsappBusinessAccount/index.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class WhatsappBusinessAccount {
  constructor(protected _transport: KyInstance) {}

  public get(
    businessAccountID: WhatsappBusinessAccountID,
    { fields, request }: MethodOptions & GetWhatsappBusinessAccountOptions = {},
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
    })<GetWhatsappBusinessAccountPayload>(
      encodeURIComponent(businessAccountID),
      request,
    );
  }
}
