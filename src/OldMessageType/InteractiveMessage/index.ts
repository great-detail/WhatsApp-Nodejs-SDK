/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import DocumentObjectMediaMessageType from "../MediaMessage/DocumentMediaMessageType";
import ImageObjectMediaMessageType from "../MediaMessage/ImageMediaMessageType";
import VideoObjectMediaMessageType from "../MediaMessage/VideoMediaMessageType";
import MessageRequestBodyType from "../MessageType";
import MessageTypesEnum from "../MessageTypesEnum";
import ButtonInteractiveMessage from "./ButtonInteractiveMessage";
import ListInteractiveMessage from "./ListInteractiveMessage";
import ProductInteractiveMessage from "./ProductInteractiveMessage";
import ProductListInteractiveMessage from "./ProductListInteractiveMessage";

export type InteractiveMessageHeader = {
  type: "document" | "image" | "text" | "video";
  document?: DocumentObjectMediaMessageType;
  image?: ImageObjectMediaMessageType;
  text?: string;
  video?: VideoObjectMediaMessageType;
};

type ProductObject = {
  product_retailer_id: string;
};

type RowObject = {
  id: string;
  title: string;
  description?: string;
};

type MultiProductSectionObject = {
  product_items: ProductObject[];
  rows?: never;
  title?: string;
};

type ListSectionObject = {
  product_items?: never;
  rows: RowObject[];
  title?: string;
};

type SectionObject = MultiProductSectionObject | ListSectionObject;

type ButtonObject = {
  title: string;
  id: string;
};

type ReplyButtonObject = {
  type: "reply";
  reply: ButtonObject;
};

export type InteractiveMessageAction = {
  button?: string;
  buttons?: ReplyButtonObject[];
  catalog_id?: string;
  product_retailer_id?: string;
  sections?: SectionObject;
};

export type InteractiveObjectMessageType =
  | ButtonInteractiveMessage
  | ListInteractiveMessage
  | ProductInteractiveMessage
  | ProductListInteractiveMessage;

type InteractiveMessage =
  MessageRequestBodyType<MessageTypesEnum.Interactive> & {
    [MessageTypesEnum.Interactive]: [InteractiveObjectMessageType];
  };
export default InteractiveMessage;
