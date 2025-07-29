# Node.js SDK for WhatsApp Business Platform APIs

An unofficial SDK for Meta's WhatsApp Business Messaging APIs - Cloud API.
Originally a fork of the
[deprecated official SDK for Meta's WhatsApp Business Messaging APIs](https://github.com/WhatsApp/WhatsApp-Nodejs-SDK).

[![npm (scoped)][]][sdk-npmjs]

[npm (scoped)]: https://img.shields.io/npm/v/%40great-detail/whatsapp
[sdk-npmjs]: https://www.npmjs.com/package/@great-detail/whatsapp

See this SDK's
[Changelog](https://github.com/great-detail/WhatsApp-Nodejs-SDK/blob/main/CHANGELOG.md)
for updates and release notes.

## Installation

Install the WhatsApp Business Platform SDK:

```bash
npm install @great-detail/whatsapp
# or PNPM or Yarn
```

## Getting started

The primary source of documentation (at the moment) for the usage of this SDK is
via JSDoc comments in the source code (and editor integrations).

```ts
import Client from "@great-detail/whatsapp"; // or require("@great-detail/whatsapp");

// Instantiate the SDK Client
const sdk = new Client({
  request: {
    headers: { Authorization: "Bearer ..." },
  },
});

// Use it!
const message = await sdk.message.createMessage({
  phoneNumberID: "123...809",
  to: "1234567890",
  type: "text",
  text: { body: "Hello" },
});
```

## Compatibility

This SDK is designed to be compatible with the Cloud API API.

| SDK  | Cloud API | NodeJS |
| :--- | :-------: | -----: |
| v8.x |    v23    |   v20+ |

Whilst the SDK may work with alternative versions of the Graph API, it is
designed to work with the above. If you find any compatibility issues, please
report them via
[GitHub Issues](https://github.com/great-detail/WhatsApp-Nodejs-SDK/issues).

See this SDK's
[Changelog](https://github.com/great-detail/WhatsApp-Nodejs-SDK/blob/main/CHANGELOG.md)
for updates and release notes.

**Tested on NodeJS LTS Versions**: `v22`, `v24`.

Additional NodeJS versions may also work, however, automated testing requires
NodeJS' test suite, which was introduced in `v21`.

## TODO

There are a number of features supported by the WhatsApp Business Cloud API that
are yet to be implemented in this SDK. Please feel free to contribute via a Pull
Request, or note your interest in particular features by creating an issue for
it.

- [ ] Interactive Message Types.
- [ ] Template Message Types.
- [ ] Button Message Types.
- [ ] Flow Message Types.
- [ ] List Message Types.
- [x] WABA Webhook Subscription Management.
- [ ] WABA Extended Credit Management.
- [x] WABA Phone Number Management.
- [ ] WABA System User Management?
- [ ] Considering Authentication usage improvements.

## License

[MIT © Great Detail Ltd](https://github.com/great-detail/WhatsApp-Nodejs-SDK/blob/main/LICENSE)

Originally forked from the official WhatsApp SDK created by Rashed Talukder.

### Contact

**Great Detail Ltd**: https://greatdetail.com <info@greatdetail.com>

## Usage

See the following usage examples for usage. Included in the source code and
editor integrations, JSDoc comments may provide additional context and
information.

### Messaging

**Create a Status Message**:

```ts
const message = await sdk.message.createStatus({
  phoneNumberID: "123...809",
  message_id: "...",
  status: "read",
  typing_indicator: { type: "text" },
});
```

**Create a Text Message**:

```ts
const message = await sdk.message.createMessage({
  phoneNumberID: "123...809",
  to: "1234567890",
  type: "text",
  text: { body: "Hello" },
});
```
