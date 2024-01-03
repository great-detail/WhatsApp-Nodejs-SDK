/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import OutgoingMessageTemplate from "./OutgoingMessageTemplate.js";

export default interface HostedOutgoingMessageTemplate
  extends OutgoingMessageTemplate {
  /**
   * Namespace of the template.
   *
   * @since 4.2.0
   */
  namespace?: string;
}
