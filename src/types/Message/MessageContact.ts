/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { AccountID } from "../Account.js";
import { PhoneNumberString } from "../PhoneNumber.js";

export type CreateMessageContact = {
  /**
   * Full contact address(es) formatted as an addresses object.
   */
  addresses: {
    type: "HOME" | "WORK" | (string & NonNullable<unknown>);

    /**
     * Street number and name.
     *
     * @since 4.2.0
     */
    street?: string;

    /**
     * City name.
     *
     * @since 4.2.0
     */
    city?: string;

    /**
     * State abbreviation.
     *
     * @since 4.2.0
     */
    state?: string;

    /**
     * ZIP code.
     *
     * @since 4.2.0
     */
    zip?: string;

    /**
     * Full country name.
     *
     * @since 4.2.0
     */
    country?: string;

    /**
     * Two-letter country abbreviation.
     *
     * @since 4.2.0
     */
    country_code?: string;
  }[];

  /**
   * YYYY-MM-DD formatted string.
   */
  birthday?:
    | `${number}${number}${number}${number}-${number}${number}-${number}${number}`
    | (string & NonNullable<unknown>);

  /**
   * Contact email address(es) formatted as an emails object.
   */
  emails: {
    type: "HOME" | "WORK" | (string & NonNullable<unknown>);

    /**
     * Email address.
     */
    email?: string;
  }[];

  /**
   * Full contact name formatted as a name object.
   * This appears to fit the required fields pattern for VCF4 contact files.
   */
  name: {
    /**
     * Full name, as it normally appears.
     */
    formatted_name: string;

    /**
     * First name.
     */
    first_name?: string;

    /**
     * Last name.
     *
     * @since 4.2.0
     */
    last_name?: string;

    /**
     * Middle name.
     *
     * @since 4.2.0
     */
    middle_name?: string;

    /**
     * Name suffix.
     *
     * @since 4.2.0
     */
    suffix?: string;

    /**
     * Name prefix.
     *
     * @since 4.2.0
     */
    prefix?: string;
  };

  org?: {
    /**
     * Name of the contact's company.
     */
    company?: string;

    /**
     * Name of the contact's department.
     */
    department?: string;

    /**
     * Contact's business title.
     */
    title?: string;
  };

  phones?: {
    type?:
      | "CELL"
      | "MAIN"
      | "IPHONE"
      | "HOME"
      | "WORK"
      | (string & NonNullable<unknown>);

    /**
     * Automatically populated with the `wa_id` value as a formatted phone
     * number.
     */
    phone?: PhoneNumberString;

    /**
     * WhatsApp ID.
     */
    wa_id?: AccountID;
  }[];

  urls: {
    type?: "HOME" | "WORK" | (string & NonNullable<unknown>);

    /**
     * URL.
     *
     * @since 4.2.0
     */
    url?: string;
  }[];
};
