<!-- Copyright (c) Meta Platforms, Inc. and affiliates.
All rights reserved.

This source code is licensed under the license found in the
LICENSE file in the root directory of this source tree.
-->

# Node.js SDK for WhatsApp Business Platform APIs

An unofficial SDK for Meta's WhatsApp Business Messaging APIs - Cloud API.

[![npm (scoped)][]][sdk-npmjs] [![Lint, Format, Test & Build][]][sdk-ci]

[npm (scoped)]: https://img.shields.io/npm/v/%40great-detail/whatsapp
[sdk-npmjs]: https://www.npmjs.com/package/@great-detail/whatsapp
[Lint, Format, Test & Build]:
  https://github.com/great-detail/WhatsApp-Nodejs-SDK/actions/workflows/nodejs.ci.yml/badge.svg
[sdk-ci]:
  https://github.com/great-detail/WhatsApp-Nodejs-SDK/actions/workflows/nodejs.ci.yml

## Getting started

<!-- TODO -->

```typescript
import CloudAPI from "@great-detail/whatsapp";

// const CloudAPI = require("@great-detail/whatsapp");

// const businessID = "123...etc...";
const sdk = new CloudAPI({ businessID });
const message = sdk.message.text({ body: "Hello" }, { toNumber: "1234567890" });
const sendReceipt = await message.send();
```

## Installation

Install the WhatsApp Business Platform SDK:

```bash
# Yarn:
yarn add @great-detail/WhatsApp-Nodejs-SDK

# NPM:
npm install @great-detail/WhatsApp-Nodejs-SDK

# PNPM:
pnpm add @great-detail/WhatsApp-Nodejs-SDK
```

## Configuration

<!-- TODO -->

## Compatibility

This SDK is designed to be compatible with the Cloud API API.

| SDK Version | Cloud API Versions |
| :---------- | -----------------: |
| TODO        |               TODO |

Whilst the SDK may work with alternative versions of the Graph API, it is
designed to work with the above. If you find any compatibility issues, please
report them via
[GitHub Issues](https://github.com/great-detail/WhatsApp-Nodejs-SDK/issues).

## Code of Conduct

Meta has adopted a Code of Conduct that we expect project participants to adhere
to. Please read the full text so that you can understand what actions will and
will not be tolerated.

## Contribute

See the [CONTRIBUTING](CONTRIBUTING.md) file for our development process, how to
propose bugfixes and improvements, and how to build and test your changes to the
WhatsApp Business Platform Node.js SDK.

## License

The WhatsApp Business Platform Node.js SDK for the Cloud API is Meta Platforms
licensed, as found in the LICENSE file.
