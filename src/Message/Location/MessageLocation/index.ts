/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export default interface MessageLocation {
  /**
   * Longitude of the location.
   *
   * @since 4.2.0
   */
  longitude: number;

  /**
   * Latitude of the location.
   *
   * @since 4.2.0
   */
  latitude: number;

  /**
   * Name of the location.
   *
   * @since 4.2.0
   */
  name: string;

  /**
   * Address of the location.
   *
   * @since 4.2.0
   */
  address: string;
}
