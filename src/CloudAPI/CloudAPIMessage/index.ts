/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParameters } from "../../API/AbstractAPI.js";
import EndpointType from "../../API/EndpointType.js";
import GraphRequest, {
  GraphRequestCreateParameters,
} from "../../GraphRequest/index.js";
import CloudOutgoingMessageContact from "../../Message/Contact/MessageContact/CloudOutgoingMessageContact.js";
import CloudOutgoingMessageInteractive from "../../Message/Interactive/MessageInteractive/Outgoing/CloudOutgoingMessageInteractive.js";
import CloudOutgoingMessageLocation from "../../Message/Location/MessageLocation/Outgoing/CloudOutgoingMessageLocation.js";
import CloudOutgoingMessageMedia from "../../Message/MessageMedia/CloudOutgoingMessageMedia.js";
import OutgoingMessageType from "../../Message/MessageType/OutgoingMessageType.js";
import CloudOutgoingMessage, {
  CloudOutgoingMessageResponse,
} from "../../Message/OutgoingMessage/CloudOutgoingMessage.js";
import CloudOutgoingMessageStatus, {
  CloudOutgoingMessageStatusResponse,
} from "../../Message/Status/MessageStatus/Outgoing/CloudOutgoingMessageStatus.js";
import CloudOutgoingStatusMessage from "../../Message/Status/StatusMessage/CloudOutgoingStatusMessage.js";
import CloudOutgoingMessageTemplate from "../../Message/Template/MessageTemplate/Outgoing/CloudOutgoingMessageTemplate.js";
import CloudOutgoingMessageText from "../../Message/Text/MessageText/Outgoing/CloudOutgoingMessageText.js";

export interface CloudAPIMessageParameters extends AbstractAPIParameters {
  phoneNumberID: string;
}

type CreateMessagePayload =
  | CloudOutgoingMessageMedia
  | CloudOutgoingMessageContact[]
  | CloudOutgoingMessageInteractive
  | CloudOutgoingMessageLocation
  | CloudOutgoingMessageTemplate
  | CloudOutgoingMessageText;

export interface CreateStatusOptionsType {
  requestOptions?: GraphRequestCreateParameters;
}

type CreateMessageOptionsType = {
  toNumber: string;
  replyMessageId?: string;
  requestOptions?: GraphRequestCreateParameters;
};

/**
 * WhatsApp Message API.
 *
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default class CloudAPIMessage extends AbstractAPI {
  protected _phoneNumberID: string;

  constructor({ phoneNumberID, ...parameters }: CloudAPIMessageParameters) {
    super(parameters);
    this._phoneNumberID = phoneNumberID;
  }

  protected getEndpoint(): EndpointType {
    return `/${this._phoneNumberID}/messages`;
  }

  /**
   * Create Status Message.
   *
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public createStatus(
    payload: CloudOutgoingMessageStatus,
    { requestOptions = {} }: CreateStatusOptionsType = {},
  ) {
    const body: CloudOutgoingStatusMessage = {
      messaging_product: "whatsapp",
      ...payload,
    };

    return GraphRequest.create<CloudOutgoingMessageStatusResponse>(
      this.getEndpoint(),
      {
        logger: this._logger,
        ...requestOptions,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          ...requestOptions.headers,
          "Content-Type": "application/json",
        },
      },
    );
  }

  /**
   * Create Message.
   *
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public createMessage<T extends OutgoingMessageType>(
    type: T,
    payload: CreateMessagePayload,
    { toNumber, replyMessageId, requestOptions = {} }: CreateMessageOptionsType,
  ) {
    const body: CloudOutgoingMessage<T> = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: toNumber,
      type: type,
      [type]: payload,
    };

    if (replyMessageId) body["context"] = { message_id: replyMessageId };

    return GraphRequest.create<CloudOutgoingMessageResponse>(
      this.getEndpoint(),
      {
        logger: this._logger,
        ...requestOptions,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          ...requestOptions.headers,
          "Content-Type": "application/json",
        },
      },
    );
  }

  protected _shorthandAlias<
    T extends OutgoingMessageType,
    P extends CreateMessagePayload,
  >(type: T) {
    const shorthandAliasFunction = (
      payload: P,
      options: CreateMessageOptionsType,
    ) => {
      return this.createMessage(type, payload, options);
    };

    return shorthandAliasFunction;
  }

  public audio = this._shorthandAlias(OutgoingMessageType.Audio);
  public contacts = this._shorthandAlias(OutgoingMessageType.Contacts);
  public document = this._shorthandAlias(OutgoingMessageType.Document);
  public image = this._shorthandAlias(OutgoingMessageType.Image);
  public interactive = this._shorthandAlias(OutgoingMessageType.Interactive);
  public location = this._shorthandAlias(OutgoingMessageType.Location);
  public sticker = this._shorthandAlias(OutgoingMessageType.Sticker);
  public template = this._shorthandAlias(OutgoingMessageType.Template);
  public text = this._shorthandAlias(OutgoingMessageType.Text);
  public video = this._shorthandAlias(OutgoingMessageType.Video);
}
