/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export enum OutgoingMessageTemplateComponentParameterType {
  Currency = "currency",
  DateTime = "date_time",
  Document = "document",
  Image = "image",
  Text = "text",
  Video = "video",
  Payload = "payload",
}

export interface PayloadOutgoingMessageTemplateComponentParameter
  extends OutgoingMessageTemplateComponentParameter<OutgoingMessageTemplateComponentParameterType.Payload> {
  /**
   * Developer-defined payload that is returned when the button is
   * clicked in addition to the display text on the button.
   *
   * @since 4.2.0
   */
  payload: string;
}

export interface TextOutgoingMessageTemplateComponentParameter
  extends OutgoingMessageTemplateComponentParameter<OutgoingMessageTemplateComponentParameterType.Text> {
  /**
   * The message's text. Character limit varies based on the following included
   * component type.
   *
   * For the `header` component type: 60 characters.
   *
   * For the `body` component type:
   *
   * - 1024 characters if other component types are included
   * - 32768 characters if `body` is the only component type included
   *
   * @since 4.2.0
   */
  text: string;
}

export interface CurrencyOutgoingMessageTemplateComponentParameter
  extends OutgoingMessageTemplateComponentParameter<OutgoingMessageTemplateComponentParameterType.Currency> {
  currency: {
    /**
     * Default text if localization fails.
     *
     * @since 4.2.0
     */
    fallback_value: string;

    /**
     * Currency code as defined in ISO 4217.
     *
     * @since 4.2.0
     */
    code: string;

    /**
     * Amount multiplied by 1000.
     *
     * @since 4.2.0
     */
    amount_1000: number;
  };
}

export interface DateTimeOutgoingMessageTemplateComponentParameter
  extends OutgoingMessageTemplateComponentParameter<OutgoingMessageTemplateComponentParameterType.DateTime> {
  date_time: {
    /**
     * Default text. For Cloud API, we always use the fallback value, and we do
     * not attempt to localize using other optional fields.
     *
     * @since 4.2.0
     */
    fallback_value: string;
  };
}

export interface ImageOutgoingMessageTemplateComponentParameter
  extends OutgoingMessageTemplateComponentParameter<OutgoingMessageTemplateComponentParameterType.Image> {
  /**
   * A media object of type image. Captions not supported when used in a media
   * template.
   *
   * @since 4.2.0
   */
  image: unknown;
}

export interface DocumentOutgoingMessageTemplateComponentParameter
  extends OutgoingMessageTemplateComponentParameter<OutgoingMessageTemplateComponentParameterType.Document> {
  /**
   * A media object of type document. Only PDF documents are supported for
   * media-based message templates. Captions not supported when used in a media
   * template.
   *
   * @since 4.2.0
   */
  document: unknown;
}

export interface VideoOutgoingMessageTemplateComponentParameter
  extends OutgoingMessageTemplateComponentParameter<OutgoingMessageTemplateComponentParameterType.Video> {
  /**
   * A media object of type video. Captions not supported when used in a media
   * template.
   *
   * @since 4.2.0
   */
  video: unknown;
}

export default interface OutgoingMessageTemplateComponentParameter<
  ComponentParameterType extends OutgoingMessageTemplateComponentParameterType,
> {
  type: ComponentParameterType;
}
