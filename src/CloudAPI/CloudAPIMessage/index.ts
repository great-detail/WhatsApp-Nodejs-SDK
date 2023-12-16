/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParams } from "../../API/AbstractAPI";
import EndpointType from "../../API/EndpointType";
import GraphRequest, { GraphRequestCreateParams } from "../../GraphRequest";
import CloudOutgoingMessageContact from "../../Message/Contact/MessageContact/CloudOutgoingMessageContact";
import CloudOutgoingMessageInteractive from "../../Message/Interactive/MessageInteractive/Outgoing/CloudOutgoingMessageInteractive";
import CloudOutgoingMessageLocation from "../../Message/Location/MessageLocation/Outgoing/CloudOutgoingMessageLocation";
import CloudOutgoingMessageMedia from "../../Message/MessageMedia/CloudOutgoingMessageMedia";
import OutgoingMessageType from "../../Message/MessageType/OutgoingMessageType";
import CloudOutgoingMessage, {
  CloudOutgoingMessageResponse,
} from "../../Message/OutgoingMessage/CloudOutgoingMessage";
import CloudOutgoingMessageStatus from "../../Message/Status/MessageStatus/Outgoing/CloudOutgoingMessageStatus";
import CloudOutgoingStatusMessage from "../../Message/Status/StatusMessage/CloudOutgoingStatusMessage";
import CloudOutgoingMessageTemplate from "../../Message/Template/MessageTemplate/Outgoing/CloudOutgoingMessageTemplate";
import CloudOutgoingMessageText from "../../Message/Text/MessageText/Outgoing/CloudOutgoingMessageText";

type CreateMessagePayload =
  | CloudOutgoingMessageMedia
  | CloudOutgoingMessageContact[]
  | CloudOutgoingMessageInteractive
  | CloudOutgoingMessageLocation
  | CloudOutgoingMessageTemplate
  | CloudOutgoingMessageText;

type CreateMessageOptionsType = {
  toNumber: string;
  replyMessageId?: string;
  requestProps?: GraphRequestCreateParams;
};

export interface CloudAPIMessageParams extends AbstractAPIParams {
  businessID: string;
}

/**
 * WhatsApp Message API.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default class CloudAPIMessage extends AbstractAPI {
  constructor(params: CloudAPIMessageParams) {
    super(params);
  }

  protected getEndpoint(): EndpointType {
    return `/${this._businessID}/messages`;
  }

  /**
   * Create Status Message.
   *
   * @since 2.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public createStatus(
    payload: CloudOutgoingMessageStatus,
    requestProps: GraphRequestCreateParams = {},
  ) {
    const body: CloudOutgoingStatusMessage = {
      messaging_product: "whatsapp",
      ...payload,
    };

    return GraphRequest.create<CloudOutgoingMessageResponse>({
      ...requestProps,
      endpoint: this.getEndpoint(),
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...requestProps.headers,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Create Message.
   *
   * @since 2.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public createMessage<T extends OutgoingMessageType>(
    type: T,
    payload: CreateMessagePayload,
    { toNumber, replyMessageId, requestProps = {} }: CreateMessageOptionsType,
  ) {
    const body: CloudOutgoingMessage<T> = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: toNumber,
      type: type,
      [type]: payload,
    };

    if (replyMessageId) body["context"] = { message_id: replyMessageId };

    return GraphRequest.create<CloudOutgoingMessageResponse>({
      ...requestProps,
      endpoint: this.getEndpoint(),
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...requestProps.headers,
        "Content-Type": "application/json",
      },
    });
  }

  protected _shorthandAlias<
    T extends OutgoingMessageType,
    P extends CreateMessagePayload,
  >(type: T) {
    const shorthandAliasFunction = function (
      this: CloudAPIMessage,
      payload: P,
      options: CreateMessageOptionsType,
    ) {
      return this.createMessage(type, payload, options);
    };

    return shorthandAliasFunction.bind(this);
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
