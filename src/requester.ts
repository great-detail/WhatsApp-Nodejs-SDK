/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import HttpsClient from "./httpsClient";
import { HttpMethodsEnum } from "./types/enums";
import { RequesterClass, GeneralHeaderInterface } from "./types/requester";
import { Logger } from "winston";

export default class Requester implements RequesterClass {
  client: Readonly<HttpsClient>;
  accessToken: Readonly<string>;
  phoneNumberId: Readonly<number>;
  businessAcctId: Readonly<string>;
  apiVersion: Readonly<string>;
  userAgent: Readonly<string>;
  host: Readonly<string>;
  protocol: Readonly<string> = "https:";
  port: Readonly<number> = 443;
  protected _logger?: Logger;

  constructor(
    host: string,
    apiVersion: string,
    phoneNumberId: number,
    accessToken: string,
    businessAcctId: string,
    userAgent: string,
    logger?: Logger,
  ) {
    this.client = new HttpsClient();
    this.host = host;
    this.apiVersion = apiVersion;
    this.phoneNumberId = phoneNumberId;
    this.accessToken = accessToken;
    this.businessAcctId = businessAcctId;
    this.userAgent = userAgent;
    this._logger = logger;
  }

  buildHeader(contentType: string): GeneralHeaderInterface {
    const headers: GeneralHeaderInterface = {
      "Content-Type": contentType,
      "Authorization": `Bearer ${this.accessToken}`,
      "User-Agent": this.userAgent,
    };
    return headers;
  }

  buildCAPIPath(endpoint: string): string {
    return `/${this.apiVersion}/${this.phoneNumberId}/${endpoint}`;
  }

  async sendCAPIRequest(
    method: HttpMethodsEnum,
    endpoint: string,
    timeout: number,
    body?: any,
  ) {
    const contentType = "application/json";

    this._logger?.debug(
      `${method} : ${this.protocol.toLowerCase()}//${this.host}:${
        this.port
      }/${this.buildCAPIPath(endpoint)}`,
    );

    return await this.client.sendRequest(
      this.host,
      this.port,
      this.buildCAPIPath(endpoint),
      method,
      this.buildHeader(contentType),
      timeout,
      method == "POST" || method == "PUT" ? body : undefined,
    );
  }
}
