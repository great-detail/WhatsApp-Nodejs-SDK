/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createLogger, format, transports } from "winston";

/**
 * Logging channel.
 *
 *
 * @since 0.0.6
 */
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.splat(),
    format.align(),
    format.colorize(),
    format.timestamp(), // ISO-8601 Datetime format
    format.printf(({ level, message, timestamp }) => {
      return [
        timestamp + " ",
        level && `[${level}]`.padEnd(8, " "),
        ": ",
        message,
      ].join("");
    }),
  ),
  transports: [new transports.Console()],
});

export default logger;
