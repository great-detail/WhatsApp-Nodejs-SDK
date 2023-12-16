/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import AbstractAPI, { AbstractAPIParams } from "../API/AbstractAPI";

export interface WhatsAppAPIParams extends AbstractAPIParams {}

/**
 * WhatsApp On-Premises API SDK.
 *
 * @since 5.6.0
 * @author Dom Webber <dom.webber@hotmail.com>
 * @example
 * // SDK instantiation
 * const sdk = new PremisesAPI();
 */
export default class PremisesAPI extends AbstractAPI {
  constructor(params: WhatsAppAPIParams) {
    super(params);
  }
}
