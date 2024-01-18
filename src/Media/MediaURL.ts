/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { MediaID } from "../ID.js";

/**
 * Media URL Object.
 *
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default interface MediaURL {
  messaging_product: "whatsapp";
  url: string;
  mine_type: string;
  sha256: string;
  file_size: string | number;
  id: MediaID;
}
