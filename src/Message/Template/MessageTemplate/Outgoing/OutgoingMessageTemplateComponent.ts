/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import {
  CurrencyOutgoingMessageTemplateComponentParameter,
  DateTimeOutgoingMessageTemplateComponentParameter,
  DocumentOutgoingMessageTemplateComponentParameter,
  ImageOutgoingMessageTemplateComponentParameter,
  PayloadOutgoingMessageTemplateComponentParameter,
  TextOutgoingMessageTemplateComponentParameter,
  VideoOutgoingMessageTemplateComponentParameter,
} from "./OutgoingMessageTemplateComponentParameter.js";

type GeneralOutgoingMessageTemplateComponentParameter =
  | TextOutgoingMessageTemplateComponentParameter
  | CurrencyOutgoingMessageTemplateComponentParameter
  | DateTimeOutgoingMessageTemplateComponentParameter
  | ImageOutgoingMessageTemplateComponentParameter
  | DocumentOutgoingMessageTemplateComponentParameter
  | VideoOutgoingMessageTemplateComponentParameter;

export type HeaderOutgoingMessageTemplateComponent =
  OutgoingMessageTemplateComponent<OutgoingMessageTemplateComponentType.Header> & {
    parameters?: GeneralOutgoingMessageTemplateComponentParameter[];
  };

export type BodyOutgoingMessageTemplateComponent =
  OutgoingMessageTemplateComponent<OutgoingMessageTemplateComponentType.Body> & {
    parameters?: GeneralOutgoingMessageTemplateComponentParameter;
  };

/**
 * TODO: Check whether this type is correct.
 *
 * @since 4.2.0
 */
export type ButtonOutgoingMessageTemplateComponent =
  OutgoingMessageTemplateComponent<OutgoingMessageTemplateComponentType.Button> & {
    index: number;
    sub_type: "url" | "quick_reply" | "catalog";
    parameters: // CatalogOutgoingMessageTemplateComponentParameter
    | PayloadOutgoingMessageTemplateComponentParameter
      | TextOutgoingMessageTemplateComponentParameter;
  };

export enum OutgoingMessageTemplateComponentType {
  Header = "header",
  Body = "body",
  Button = "button",
}

type OutgoingMessageTemplateComponent<
  ComponentType extends OutgoingMessageTemplateComponentType,
> = {
  type: ComponentType;
};

export default OutgoingMessageTemplateComponent;
