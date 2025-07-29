/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import ky, { KyInstance, Options as KyOptions } from "ky";
import {
  MediaDeleteOptions,
  MediaDeletePayload,
  MediaGetURLOptions,
  MediaGetURLPayload,
  MediaUploadOptions,
  MediaUploadPayload,
} from "../types/Media.js";
import { PhoneNumberID } from "../types/PhoneNumber.js";

interface MethodOptions {
  request?: KyOptions;
}

export interface DownloadOptions {
  mediaURL: string;
}

export default class Media {
  constructor(protected _transport: KyInstance) {}

  protected getEndpoint(phoneNumberID: PhoneNumberID) {
    return encodeURIComponent(phoneNumberID) + "/media";
  }

  /**
   * Upload Media.
   * All media files sent through this endpoint are encrypted and persist for
   * 30 days, unless they are deleted earlier.
   */
  public upload({
    phoneNumberID,
    file,
    filename,
    mimeType,
    request,
  }: MethodOptions & MediaUploadOptions) {
    const formData = new FormData();
    formData.set("messaging_product", "whatsapp");
    formData.set("file", file, filename);
    formData.set("type", mimeType);

    return this._transport.extend({
      method: "POST",
      body: formData,
    })<MediaUploadPayload>(this.getEndpoint(phoneNumberID), request);
  }

  /**
   * Retrieve Media URL.
   * Use the returned URL to download the media file. Note that clicking this
   * URL (i.e. performing a generic GET) will not return the media; you must
   * include an access token.
   *
   * A successful response includes an object with a media url. The URL is only
   * valid for 5 minutes.
   */
  public getURL({
    mediaID,
    phoneNumberID,
    request,
  }: MethodOptions & MediaGetURLOptions) {
    return this._transport.extend({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      searchParams: {
        ...(phoneNumberID
          ? {
              phone_number_id: phoneNumberID,
            }
          : {}),
      },
    })<MediaGetURLPayload>(encodeURIComponent(mediaID), request);
  }

  public delete({
    mediaID,
    phoneNumberID,
    request,
  }: MethodOptions & MediaDeleteOptions) {
    return this._transport.extend({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      searchParams: {
        ...(phoneNumberID
          ? {
              phone_number_id: phoneNumberID,
            }
          : {}),
      },
    })<MediaDeletePayload>(encodeURIComponent(mediaID), request);
  }

  /**
   * Download Media.
   * All media URLs expire after 5 minutes —you need to retrieve the media URL
   * again if it expires. If you directly click on the URL you get from a
   * `/MEDIA_ID` GET call, you get an access error.
   *
   * If successful, you will receive the binary data of media saved in
   * media_file, response headers contain a content-type header to indicate the
   * mime type of returned data.
   *
   * If media fails to download, you will receive a `404 Not Found` response
   * code. In that case, we recommend you try to retrieve a new media URL and
   * download it again. If doing so doesn't resolve the issue, please try to
   * renew the `ACCESS_TOKEN` then retry downloading the media.
   *
   * @see {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types}
   * @example
   * // Download Media and Write to a File
   * const download = await sdk.media.download({ mediaURL });
   * const file = await download.arrayBuffer();
   * fs.writeFile("filename.ext", Buffer.from(file));
   */
  public download({ mediaURL, request }: MethodOptions & DownloadOptions) {
    return ky.create({
      method: "GET",
      headers: {
        "User-Agent": "node",

        // Work-around for issues regarding server-sent User-Agents
        Host: "lookaside.fbsbx.com",
      },
    })(mediaURL, request);
  }
}
