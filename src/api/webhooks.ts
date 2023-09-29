/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import HttpsServer from "../httpsServer";
import { WAConfigType } from "../types/config";
import { WAConfigEnum } from "../types/enums";
import { RequesterClass } from "../types/requester";
import * as w from "../types/webhooks";
import { generateXHub256Sig } from "../utils";
import BaseAPI from "./base";
import { IncomingMessage, ServerResponse } from "http";
import { Logger } from "winston";

export default class WebhooksAPI extends BaseAPI implements w.WebhooksClass {
  userAgent: string;
  server?: HttpsServer;
  protected _logger?: Logger;

  constructor(
    config: WAConfigType,
    HttpsClient: RequesterClass,
    userAgent: string,
    logger?: Logger,
  ) {
    super(config, HttpsClient);
    this.userAgent = userAgent;
    this._logger = logger;
  }

  start(cb: w.WebhookCallback): boolean {
    this.server = new HttpsServer(
      this.config[WAConfigEnum.ListenerPort],
      (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader("User-Agent", this.userAgent);

        if (req.url) {
          const requestPath = new URL(req.url, `https://${req.headers.host}`);
          this._logger?.debug(
            `received request (method: ${req.method}) for URL ${requestPath}`,
          );

          if (
            requestPath.pathname ==
            `/${this.config[WAConfigEnum.WebhookEndpoint]}`
          ) {
            if (req.method === "GET") {
              if (
                requestPath.searchParams.get("hub.mode") == "subscribe" &&
                requestPath.searchParams.get("hub.verify_token") ==
                  this.config[WAConfigEnum.WebhookVerificationToken]
              ) {
                res.write(requestPath.searchParams.get("hub.challenge"));
                res.end();
                this._logger?.info(
                  `webhook subscription request from ${requestPath.href} successfully verified`,
                );
              } else {
                const errorMessage = `webhook subscription request from ${requestPath.href} has either missing or non-matching verify token`;
                const responseStatus = 401;

                this._logger?.error(errorMessage);
                res.writeHead(responseStatus);
                res.end();
                cb(
                  responseStatus,
                  req.headers,
                  undefined,
                  undefined,
                  new Error(errorMessage),
                );
              }
            } else if (
              req.method === "POST" &&
              req.headers["x-hub-signature-256"]
            ) {
              //Removing the prepended 'sha256=' string
              const xHubSignature = req.headers["x-hub-signature-256"]
                .toString()
                .replace("sha256=", "");

              let bodyBuf: Buffer[] = [];
              req.on("data", (chunk) => {
                bodyBuf = bodyBuf + chunk; // linter bug where push() and "+=" throws an error

                if (bodyBuf.length > 1e6) req.destroy(); // close connection if payload is larger than 1MB for some reason
              });

              req.on("end", () => {
                const body = Buffer.concat(bodyBuf).toString();

                const generatedSignature = generateXHub256Sig(
                  body,
                  this.config[WAConfigEnum.AppSecret],
                );

                const cbBody: w.WebhookObject = JSON.parse(body);

                if (generatedSignature == xHubSignature) {
                  const responseStatus = 200;
                  this._logger?.verbose(
                    "x-hub-signature-256 header matches generated signature",
                  );
                  cb(responseStatus, req.headers, cbBody, res, undefined);
                } else {
                  const errorMessage = "error: x-hub signature doesn't match";
                  const responseStatus = 401;

                  this._logger?.error(errorMessage);
                  res.writeHead(responseStatus);
                  res.end(errorMessage);

                  cb(
                    responseStatus,
                    req.headers,
                    cbBody,
                    undefined,
                    new Error(errorMessage),
                  );
                }
              });

              req.on("error", (err) => {
                const responseStatus = 500;
                cb(responseStatus, req.headers, undefined, res, err);
              });
            }
          }
        }
      },
    );

    return this.isStarted();
  }

  isStarted(): boolean {
    return this.server != null && this.server.isListening();
  }

  stop(cb: (err?: Error) => any): boolean {
    if (!this.server) {
      throw new Error("Server not started");
    }
    this.server.close(cb);
    return this.isStarted();
  }
}
