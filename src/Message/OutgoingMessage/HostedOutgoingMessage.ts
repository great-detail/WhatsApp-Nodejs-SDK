/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import OutgoingMessage from ".";
import { AccountID, MessageID } from "..";
import OutgoingMessageType from "../MessageType/OutgoingMessageType";

export interface HostedOutgoingMessageResponse {
  /**
   * Messaging service used for the request. Use "whatsapp".
   *
   * @default 'whatsapp'
   */
  messaging_product: "whatsapp";

  // TODO: Reuse this
  contacts: {
    input: string;
    wa_id: AccountID;
  }[];
  messages: {
    id: MessageID;
  }[];
}

export interface HostedOutgoingMessageHsm {
  /**
   * The namespace to be used. Beginning with v2.2.7, if the namespace does not
   * match up to the element_name, the message fails to send.
   *
   * @since 4.2.0
   */
  namespace: unknown;

  /**
   * The element name that indicates which template to use within the
   * namespace. Beginning with v2.2.7, if the element_name does not match up to
   * the namespace, the message fails to send.
   *
   * @since 4.2.0
   */
  element_name: unknown;

  /**
   * Allows for the specification of a deterministic language. See the Language
   * section for more information.
   *
   * This field used to allow for a fallback option, but this has been
   * deprecated with v2.27.8.
   *
   * @since 4.2.0
   */
  language: unknown;

  /**
   * This field is an array of values to apply to variables in the template.
   *
   * @since 4.2.0
   */
  localizable_params: unknown;
}

/**
 * Base Hosted Outgoing Message.
 *
 * @since 4.2.0
 */
export default interface HostedOutgoingMessage<
  MessageType extends OutgoingMessageType,
> extends OutgoingMessage<MessageType> {
  /**
   * Contains an hsm object. This option was deprecated with v2.39 of the
   * On-Premises API. Use the `template` object instead.
   *
   * @since 4.2.0
   * @deprecated since On-Premises API v2.39
   */
  hsm?: HostedOutgoingMessageHsm;
}
