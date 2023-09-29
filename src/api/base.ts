/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { BaseClass } from "../types/base";
import { WAConfigType } from "../types/config";
import { RequesterClass } from "../types/requester";
import { Logger } from "winston";

export default class BaseAPI implements BaseClass {
  protected client: RequesterClass;
  protected config: WAConfigType;
  protected _logger?: Logger;

  constructor(
    config: WAConfigType,
    HttpsClient: RequesterClass,
    logger?: Logger,
  ) {
    this.client = HttpsClient;
    this.config = config;
    this._logger = logger;

    this._logger?.info(`Initialized with HTTPSClient`);
  }
}
