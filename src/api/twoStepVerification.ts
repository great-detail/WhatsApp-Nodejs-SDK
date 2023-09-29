/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HttpMethodsEnum, WAConfigEnum } from "../types/enums";
import { RequesterResponseInterface } from "../types/requester";
import * as tsv from "../types/twoStepVerification";
import BaseAPI from "./AbstractAPI";

export default class TwoStepVerificationAPI
  extends BaseAPI
  implements tsv.TwoStepVerificationClass
{
  private readonly commonMethod = HttpMethodsEnum.Post;
  private readonly commonEndpoint = "";

  setPin(
    pin: number,
  ): Promise<RequesterResponseInterface<tsv.SetPinResponseObject>> {
    const body: tsv.TwoStepVerificationObject = { pin: pin.toString() };
    this._logger?.info(
      `Setting two-step verification pin for phone number Id ${
        this.config[WAConfigEnum.PhoneNumberId]
      }`,
    );

    return this.client.sendCAPIRequest(
      this.commonMethod,
      this.commonEndpoint,
      this.config[WAConfigEnum.RequestTimeout],
      JSON.stringify(body),
    );
  }
}
