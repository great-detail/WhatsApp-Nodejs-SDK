/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import GraphRequest, {
  AccessTokenType,
  GraphRequestProps,
  PathType,
} from "../GraphRequest";
import { WAConfigType } from "../types/config";
import { Logger } from "winston";

export interface CreateRequestProps {
  accessToken?: AccessTokenType;
}
export type CreateRequestAdditionalProps = Omit<
  GraphRequestProps,
  keyof CreateRequestProps
>;

export default abstract class AbstractAPI {
  abstract endpoint: PathType;
  protected _requester: typeof GraphRequest;
  protected _config: WAConfigType;
  protected _accessToken: AccessTokenType;
  protected _logger?: Logger;

  constructor(
    config: WAConfigType,
    requester: typeof GraphRequest,
    accessToken: AccessTokenType,
    logger?: Logger,
  ) {
    this._requester = requester;
    this._config = config;
    this._accessToken = accessToken;
    this._logger = logger;

    this._logger?.info(`Initialized with HTTPSClient`);
  }

  protected createRequest({
    accessToken = this._accessToken,
    ...requestProps
  }: CreateRequestProps & CreateRequestAdditionalProps) {
    return new this._requester({
      ...requestProps,
      accessToken,
      path: this.endpoint,
    });
  }
}
