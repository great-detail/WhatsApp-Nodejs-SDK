/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { PhoneNumber, AccountID } from "../../../ID.js";

type MessageContactDetailType =
  | "HOME"
  | "WORK"
  | (string & NonNullable<unknown>);

export interface MessageContactURL {
  type?: MessageContactDetailType;

  /**
   * URL.
   *
   * @since 4.2.0
   */
  url?: string;
}

export interface MessageContactPhone {
  type?: "CELL" | "MAIN" | "IPHONE" | MessageContactDetailType;

  /**
   * Automatically populated with the `wa_id` value as a formatted phone
   * number.
   *
   * @since 4.2.0
   */
  phone?: PhoneNumber;

  /**
   * WhatsApp ID.
   *
   * @since 4.2.0
   */
  wa_id?: AccountID;
}

export interface MessageContactOrg {
  /**
   * Name of the contact's company.
   *
   * @since 4.2.0
   */
  company?: string;

  /**
   * Name of the contact's department.
   *
   * @since 4.2.0
   */
  department?: string;

  /**
   * Contact's business title.
   *
   * @since 4.2.0
   */
  title?: string;
}

export interface MessageContactName {
  /**
   * Full name, as it normally appears.
   *
   * @since 4.2.0
   */
  formatted_name: string;

  /**
   * First name.
   *
   * @since 4.2.0
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
}

export interface MessageContactEmail {
  type?: MessageContactDetailType;

  /**
   * Email address.
   *
   * @since 4.2.0
   */
  email?: string;
}

export interface MessageContactAddress {
  type?: MessageContactDetailType;

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
}

export default interface MessageContact {
  /**
   * Full contact address(es) formatted as an addresses object.
   *
   * @since 4.2.0
   */
  addresses: MessageContactAddress[];

  /**
   * YYYY-MM-DD formatted string.
   *
   * @since 4.2.0
   */
  birthday?: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

  /**
   * Contact email address(es) formatted as an emails object.
   *
   * @since 4.2.0
   */
  emails?: MessageContactEmail[];

  /**
   * Full contact name formatted as a name object.
   *
   * @since 4.2.0
   */
  name: MessageContactName;

  /**
   * Contact organization information formatted as an org object.
   *
   * @since 4.2.0
   */
  org?: MessageContactOrg;

  /**
   * Contact phone number(s) formatted as a phone object.
   *
   * @since 4.2.0
   */
  phones?: MessageContactPhone[];

  /**
   * Contact URL(s) formatted as a urls object.
   *
   * @since 4.2.0
   */
  urls?: MessageContactURL[];
}
