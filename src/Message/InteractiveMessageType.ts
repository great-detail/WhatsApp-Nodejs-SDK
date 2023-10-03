/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import DocumentObjectMediaMessageType from "./MediaMessage/DocumentMediaMessageType";
import ImageObjectMediaMessageType from "./MediaMessage/ImageMediaMessageType";
import VideoObjectMediaMessageType from "./MediaMessage/VideoMediaMessageType";
import MessageRequestBodyType from "./MessageType";
import MessageTypesEnum from "./MessageTypesEnum";

export const enum InteractiveTypesEnum {
  Button = "button",
  List = "list",
  Product = "product",
  ProductList = "product_list",
}

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

type ActionObject = {
  button?: string;
  buttons?: ReplyButtonObject[];
  catalog_id?: string;
  product_retailer_id?: string;
  sections?: SectionObject;
};

type HeaderObject = {
  type: "document" | "image" | "text" | "video";
  document?: DocumentObjectMediaMessageType;
  image?: ImageObjectMediaMessageType;
  text?: string;
  video?: VideoObjectMediaMessageType;
};

type ButtonInteractiveObject = {
  type: InteractiveTypesEnum.Button;
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  header?: HeaderObject;
  action: ActionObject;
};

type ListInteractiveObject = {
  type: InteractiveTypesEnum.List;
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  header?: HeaderObject;
  action: ActionObject;
};

type ProductInteractiveObject = {
  type: InteractiveTypesEnum.Product;
  body?: {
    text: string;
  };
  footer?: {
    text: string;
  };
  header?: HeaderObject;
  action: ActionObject;
};

type ProductListInteractiveObject = {
  type: InteractiveTypesEnum.ProductList;
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  header: HeaderObject;
  action: ActionObject;
};

export type InteractiveObjectMessageType =
  | ButtonInteractiveObject
  | ListInteractiveObject
  | ProductInteractiveObject
  | ProductListInteractiveObject;

type InteractiveMessageType =
  MessageRequestBodyType<MessageTypesEnum.Interactive> & {
    [MessageTypesEnum.Interactive]: [InteractiveObjectMessageType];
  };
export default InteractiveMessageType;
