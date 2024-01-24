/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParameters } from "../../API/AbstractAPI.js";
import GraphRequest, {
  GraphRequestCreateParameters,
} from "../../GraphRequest/index.js";
import { MediaID, WhatsAppPhoneNumberID } from "../../ID.js";
import { DeleteMediaResponse } from "../../Media/DeleteMedia.js";
import MediaURL from "../../Media/MediaURL.js";
import { CloudOutgoingMediaResponse } from "../../Media/OutgoingMedia/CloudOutgoingMedia.js";
import { createHash, timingSafeEqual } from "node:crypto";

export interface UploadMediaOptions {
  phoneNumberID: WhatsAppPhoneNumberID;
  mimeType: string;
  filename?: string;
  requestOptions?: GraphRequestCreateParameters;
}

export interface GetMediaURLMediaOptions {
  /**
   * Business phone number ID.
   * If included, the operation will only be processed if the ID matches the
   * ID of the business phone number that the media was uploaded on.
   */
  phoneNumberID?: WhatsAppPhoneNumberID;
  requestOptions?: GraphRequestCreateParameters;
}

export interface DeleteMediaOptions {
  /**
   * Business phone number ID.
   * If included, the operation will only be processed if the ID matches the
   * ID of the business phone number that the media was uploaded on.
   */
  phoneNumberID?: WhatsAppPhoneNumberID;
  requestOptions?: GraphRequestCreateParameters;
}

export interface DownloadMediaOptions {
  requestOptions?: GraphRequestCreateParameters;
}

export interface CloudAPIMediaParameters extends AbstractAPIParameters {}

/**
 * WhatsApp Media API.
 *
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default class CloudAPIMedia extends AbstractAPI {
  constructor(parameters: CloudAPIMediaParameters) {
    super(parameters);
  }

  /**
   * Upload Media.
   * All media files sent through this endpoint are encrypted and persist for
   * 30 days, unless they are deleted earlier.
   */
  public upload(
    file: Blob,
    {
      phoneNumberID,
      mimeType,
      filename: overrideFilename,
      requestOptions = {},
    }: UploadMediaOptions,
  ) {
    const formData = new FormData();
    formData.set("messaging_product", "whatsapp");
    formData.set("file", file, overrideFilename);
    formData.set("type", mimeType);

    return GraphRequest.create<CloudOutgoingMediaResponse>(
      `/${phoneNumberID}/media`,
      {
        logger: this._logger,
        ...requestOptions,
        method: "POST",
        body: formData,
      },
    );
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
  public getURL(
    mediaID: MediaID,
    { phoneNumberID, requestOptions = {} }: GetMediaURLMediaOptions = {},
  ) {
    const searchQuery = new URLSearchParams();
    if (phoneNumberID) {
      searchQuery.set("phone_number_id", phoneNumberID);
    }

    return GraphRequest.create<MediaURL>(
      `/${mediaID}?${searchQuery.toString()}`,
      {
        logger: this._logger,
        ...requestOptions,
        method: "GET",
        headers: {
          ...requestOptions.headers,
          "Content-Type": "application/json",
        },
      },
    );
  }

  /**
   * Delete Media.
   */
  public delete(
    mediaID: MediaID,
    { phoneNumberID, requestOptions = {} }: DeleteMediaOptions = {},
  ) {
    const searchQuery = new URLSearchParams();
    if (phoneNumberID) {
      searchQuery.set("phone_number_id", phoneNumberID);
    }

    return GraphRequest.create<DeleteMediaResponse>(
      `/${mediaID}?${searchQuery.toString()}`,
      {
        logger: this._logger,
        ...requestOptions,
        method: "DELETE",
        headers: {
          ...requestOptions.headers,
          "Content-Type": "application/json",
        },
      },
    );
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
   * const download = sdk.media({ businessID: "123456" })
   *   .download(mediaURL);
   * const downloadReceipt = await download.send();
   * const file = await downloadReceipt.arrayBuffer();
   * fs.writeFile("filename.ext", Buffer.from(file));
   */
  public download(
    mediaURL: string,
    { requestOptions = {} }: DownloadMediaOptions = {},
  ) {
    this._logger?.warn("This method may not work as expected.");
    return new GraphRequest(mediaURL, {
      logger: this._logger,
      ...requestOptions,
      method: "GET",
      headers: {
        ...requestOptions.headers,
        "User-Agent": "node",
        Host: "lookaside.fbsbx.com",
      },
    });
  }

  /**
   * Verify the SHA-256 Hash from the Media URL.
   * Once a media file has been downloading using `CloudAPIMedia.download(...)`
   * it's SHA-256 hash should be verified using this method to ensure its
   * integrity.
   *
   * @since 1.0.0
   */
  public verifySha256(content: Buffer, sha256: Buffer | string): boolean {
    const calculatedHash = createHash("sha256").update(content).digest();
    const inputHash = Buffer.isBuffer(sha256)
      ? sha256
      : Buffer.from(sha256, "hex");

    return (
      calculatedHash.length === inputHash.length &&
      timingSafeEqual(calculatedHash, inputHash)
    );
  }
}
