/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Logger from "../logger";
import { BaseClass } from "../types/base";
import { WAConfigType } from "../types/config";
import { RequesterClass } from "../types/requester";

const LIB_NAME = "BaseAPI";
const LOG_LOCAL = false;
const LOGGER = new Logger(LIB_NAME, process.env.DEBUG === "true" || LOG_LOCAL);

export default class BaseAPI implements BaseClass {
  protected client: RequesterClass;
  protected config: WAConfigType;

  constructor(config: WAConfigType, HttpsClient: RequesterClass) {
    this.client = HttpsClient;
    this.config = config;

    LOGGER.log(`Initialized with HTTPSClient`);
  }
}
