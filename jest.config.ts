/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  testRegex: String.raw`./src/.*\.(test|spec)?\.(ts|ts)$`,
  moduleNameMapper: {
    [String.raw`^(\.{1,2}/.*)\.js$`]: "$1",
  },
  transform: {
    [String.raw`^.+\.(t|j)sx?$`]: "ts-jest",
  },
};

export default config;
