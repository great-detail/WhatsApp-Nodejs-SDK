/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import APIInterface from "./APIInterface.js";
import type { Logger } from "winston";

export interface AbstractAPIParameters {
  logger?: Logger;
}

/**
 * Abstract API.
 * Provides some of the common functionality for the API classes, including
 * those that are likely to be reused such as endpoint construction.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default abstract class AbstractAPI implements APIInterface {
  protected _logger?: Logger;

  constructor({ logger }: AbstractAPIParameters) {
    this._logger = logger;
  }
}
