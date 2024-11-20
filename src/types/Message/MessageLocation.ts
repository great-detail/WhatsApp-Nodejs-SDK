/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export type CreateMessageLocation = {
  /**
   * Longitude of the location.
   */
  longitude: number;

  /**
   * Latitude of the location.
   */
  latitude: number;

  /**
   * Name of the location.
   */
  name: string;

  /**
   * Address of the location.
   */
  address: string;
};
