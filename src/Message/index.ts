/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { KyInstance, Options as KyOptions } from "ky";
import {
  CreateMessageOptions,
  CreateMessagePayload,
} from "../types/Message/index.js";
import { PhoneNumberID } from "../types/PhoneNumber.js";
import { CreateStatusOptions, CreateStatusPayload } from "../types/Status.js";

interface MethodOptions {
  request?: KyOptions;
}

export default class Message {
  constructor(protected _transport: KyInstance) {}

  protected getEndpoint(phoneNumberID: PhoneNumberID) {
    return encodeURIComponent(phoneNumberID) + "/messages";
  }

  public createStatus({
    phoneNumberID,
    request,
    ...status
  }: MethodOptions & CreateStatusOptions) {
    return this._transport.extend({
      method: "POST",
      json: {
        messaging_product: "whatsapp",
        ...status,
      },
    })<CreateStatusPayload>(this.getEndpoint(phoneNumberID), request);
  }

  public createMessage({
    to,
    phoneNumberID,
    context,
    recipientType = "individual",
    request,
    ...message
  }: MethodOptions & CreateMessageOptions) {
    return this._transport.extend({
      method: "POST",
      json: {
        messaging_product: "whatsapp",
        recipient_type: recipientType,
        context,
        to,

        ...message,
      },
    })<CreateMessagePayload>(this.getEndpoint(phoneNumberID), request);
  }
}
