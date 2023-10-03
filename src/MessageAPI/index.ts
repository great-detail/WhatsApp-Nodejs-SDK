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

/**
 * WhatsApp Message API.
 *
 * @since 0.0.6
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

  public createStatusRead(
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

  public createMessage<
    T extends MessageTypesEnum,
    C extends ComponentTypesEnum,
  >(
    type: T,
    payload:
      | AudioObjectMediaMessageType
      | [ContactsObjectMessageType]
      | DocumentObjectMediaMessageType
      | ImageObjectMediaMessageType
      | InteractiveObjectMessageType
      | LocationObjectMessageType
      | TemplateObjectMessageType<C>
      | StickerObjectMediaMessageType
      | TextObjectMessageType
      | VideoObjectMediaMessageType,
    toNumber: string,
    replyMessageId?: string,
    requestProps: GraphRequestProps = {},
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
}
