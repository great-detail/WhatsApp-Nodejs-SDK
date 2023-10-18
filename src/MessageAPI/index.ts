/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI from "../API/AbstractAPI";
import GraphRequest, { GraphRequestProps } from "../GraphRequest";
import ComponentTypesEnum from "../Message/ComponentTypesEnum";
import { ContactsObjectMessageType } from "../Message/ContactsMessageType";
import { InteractiveObjectMessageType } from "../Message/InteractiveMessageType";
import { LocationObjectMessageType } from "../Message/LocationMessageType";
import { AudioObjectMediaMessageType } from "../Message/MediaMessage/AudioMediaMessageType";
import { DocumentObjectMediaMessageType } from "../Message/MediaMessage/DocumentMediaMessageType";
import { ImageObjectMediaMessageType } from "../Message/MediaMessage/ImageMediaMessageType";
import { StickerObjectMediaMessageType } from "../Message/MediaMessage/StickerMediaMessageType";
import { VideoObjectMediaMessageType } from "../Message/MediaMessage/VideoMediaMessageType";
import MessageResponseType from "../Message/MessageResponseType";
import MessageType from "../Message/MessageType";
import MessageTypesEnum from "../Message/MessageTypesEnum";
import StatusMessageType, {
  StatusObjectMessageType,
} from "../Message/StatusMessageType";
import { TemplateObjectMessageType } from "../Message/TemplateMessageType";
import { TextObjectMessageType } from "../Message/TextObjectMessageType";

type CreateMessagePayloadType<C extends ComponentTypesEnum> =
  | AudioObjectMediaMessageType
  | [ContactsObjectMessageType]
  | DocumentObjectMediaMessageType
  | ImageObjectMediaMessageType
  | InteractiveObjectMessageType
  | LocationObjectMessageType
  | TemplateObjectMessageType<C>
  | StickerObjectMediaMessageType
  | TextObjectMessageType
  | VideoObjectMediaMessageType;

type CreateMessageOptionsType = {
  toNumber: string;
  replyMessageId?: string;
  requestProps?: GraphRequestProps;
};

/**
 * WhatsApp Message API.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default class MessageAPI extends AbstractAPI {
  protected getEndpoint(): string {
    return this.joinEndpoints(
      this.getParentEndpoint(),
      this.businessId,
      "messages",
    );
  }

  /**
   * Create Status Message.
   *
   * @since 2.0.0
   * @author Dom Webber <dom.webber@hotmail.com>
   */
  public createStatus(
    payload: StatusObjectMessageType,
    requestProps: GraphRequestProps = {},
  ) {
    const body: StatusMessageType = {
      messaging_product: "whatsapp",
      ...payload,
    };

    return new GraphRequest({
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
  public createMessage<
    T extends MessageTypesEnum,
    C extends ComponentTypesEnum,
  >(
    type: T,
    payload: CreateMessagePayloadType<C>,
    { toNumber, replyMessageId, requestProps = {} }: CreateMessageOptionsType,
  ) {
    const body: MessageType<T> = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: toNumber,
      type: type,
      [type]: payload,
    };

    if (replyMessageId) body["context"] = { message_id: replyMessageId };

    return new GraphRequest<MessageResponseType>({
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
    T extends MessageTypesEnum,
    C extends ComponentTypesEnum,
    P extends CreateMessagePayloadType<C>,
  >(type: T) {
    const shorthandAliasFunction = function (
      this: MessageAPI,
      payload: P,
      options: CreateMessageOptionsType,
    ) {
      return this.createMessage(type, payload, options);
    };

    return shorthandAliasFunction.bind(this);
  }

  public audio = this._shorthandAlias(MessageTypesEnum.Audio);
  public contacts = this._shorthandAlias(MessageTypesEnum.Contacts);
  public document = this._shorthandAlias(MessageTypesEnum.Document);
  public image = this._shorthandAlias(MessageTypesEnum.Image);
  public interactive = this._shorthandAlias(MessageTypesEnum.Interactive);
  public location = this._shorthandAlias(MessageTypesEnum.Location);
  public sticker = this._shorthandAlias(MessageTypesEnum.Sticker);
  public template = this._shorthandAlias(MessageTypesEnum.Template);
  public text = this._shorthandAlias(MessageTypesEnum.Text);
  public video = this._shorthandAlias(MessageTypesEnum.Video);
}
