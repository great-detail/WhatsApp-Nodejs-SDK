/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import MessageTemplate from "../index.js";
import {
  BodyOutgoingMessageTemplateComponent,
  ButtonOutgoingMessageTemplateComponent,
  HeaderOutgoingMessageTemplateComponent,
} from "./OutgoingMessageTemplateComponent.js";

type OutgoingMessageTemplateLanguagePolicy =
  | "deterministic"
  | (string & NonNullable<unknown>);

interface OutgoingMessageTemplateLanguage {
  /**
   * The language policy the message should follow. The only supported option
   * is deterministic.
   *
   * @since 4.2.0
   */
  policy: OutgoingMessageTemplateLanguagePolicy;

  /**
   * The code of the language or locale to use. Accepts both language and
   * language_locale formats (e.g., en and en_US).
   *
   * @since 4.2.0
   * @see {@link https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#supported-languages}
   */
  code: string;
}

export default interface OutgoingMessageTemplate extends MessageTemplate {
  /**
   * Name of the template.
   *
   * @since 4.2.0
   */
  name: string;

  /**
   * Contains a language object. Specifies the language the template may be
   * rendered in.
   *
   * @since 4.2.0
   */
  language: OutgoingMessageTemplateLanguage;

  /**
   * Array of components objects containing the parameters of the message.
   *
   * @since 4.2.0
   */
  components?: (
    | HeaderOutgoingMessageTemplateComponent
    | BodyOutgoingMessageTemplateComponent
    | ButtonOutgoingMessageTemplateComponent
  )[];
}
