/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { PhoneNumberID } from "./PhoneNumber.js";

export type MediaID = string;

export interface MediaUploadOptions {
  file: Blob;
  phoneNumberID: PhoneNumberID;
  filename?: string;
  mimeType: string;
}

export type MediaUploadPayload = {
  id: MediaID;
}

export type MediaGetURLOptions = {
  phoneNumberID?: PhoneNumberID;
  mediaID: MediaID;
}

export type MediaGetURLPayload = {
  messaging_product: "whatsapp";
  url: string;
  mime_type: string;
  sha256: string;
  file_size: string | number;
  id: MediaID;
}

export type MediaDeleteOptions = {
  phoneNumberID?: PhoneNumberID;
  mediaID: MediaID;
}

export type MediaDeletePayload = {
  success: boolean;
}
