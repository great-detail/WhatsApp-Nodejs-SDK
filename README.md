# Node.js SDK for WhatsApp Business Platform APIs

An unofficial SDK for Meta's WhatsApp Business Messaging APIs - Cloud API.
Originally a fork of the
[deprecated official SDK for Meta's WhatsApp Business Messaging APIs](https://github.com/WhatsApp/WhatsApp-Nodejs-SDK).

[![npm (scoped)][]][sdk-npmjs] [![Lint, Format, Test & Build][]][sdk-ci]

[npm (scoped)]: https://img.shields.io/npm/v/%40great-detail/whatsapp
[sdk-npmjs]: https://www.npmjs.com/package/@great-detail/whatsapp
[Lint, Format, Test & Build]:
  https://github.com/great-detail/WhatsApp-Nodejs-SDK/actions/workflows/nodejs.ci.yml/badge.svg
[sdk-ci]:
  https://github.com/great-detail/WhatsApp-Nodejs-SDK/actions/workflows/nodejs.ci.yml

## Getting started

**ESM Import**:

```ts
import Client from "@great-detail/whatsapp";
```

**CJS Import**:

```ts
const CloudAPI = require("@great-detail/whatsapp").default;
```

**Usage**:

```typescript
const sdk = new Client();
const message = await sdk.message.createMessage({
  phoneNumberID: "123...809",
  to: "1234567890",
  type: "text",
  text: {
    body: "Hello",
  },
  request: {
    headers: {
      Authorization: "Bearer ...",
    },
  },
});
```

## Installation

Install the WhatsApp Business Platform SDK:

```bash
# NPM:
npm install @great-detail/whatsapp

# Yarn:
yarn add @great-detail/whatsapp

# PNPM:
pnpm add @great-detail/whatsapp
```

## CLI Usage

```bash
export WHATSAPP_ACCESS_TOKEN=""
export WHATSAPP_PHONE_NUMBER_ID=""

# Send a Text Message
# TODO: Re-add with updated SDK
# npx @great-detail/whatsapp message send text "<RECIPIENT>" --body="Hello, World!"
# Note: <RECIPIENT> may be a Phone Number ID - it may not always be the phone number itself.

# Send an Image Message
# TODO: Re-add with updated SDK
# npx @great-detail/whatsapp message send image "<RECIPIENT>" --media-id="<MEDIA_ID>"
# Use --filename="..." to set the filename of the image.
# Use --caption="..." to set a caption on the image.

# Upload a Media File
npx @great-detail/whatsapp media upload --mime-type="<MIME_TYPE>" < "<FILE_FROM_STDIN>"

# Get a Media File's URL
npx @great-detail/whatsapp media get-url "<MEDIA_ID>"
# Note: With WHATSAPP_PHONE_NUMBER_ID set, the request will check if the media
# is available for that phone number. To prevent this check, unset the env var
# or add --phone-number-id="" to the command.

# Download a Media File
npx @great-detail/whatsapp media download "<MEDIA_URL>" > "<FILE_TO_STDOUT>"
```

## Compatibility

This SDK is designed to be compatible with the Cloud API API.

| SDK  | Cloud API | NodeJS (Tested) |
| :--- | :-------: | --------------: |
| v7.X |    v20    |            v18+ |

Whilst the SDK may work with alternative versions of the Graph API, it is
designed to work with the above. If you find any compatibility issues, please
report them via
[GitHub Issues](https://github.com/great-detail/WhatsApp-Nodejs-SDK/issues).

Additional NodeJS versions may also work, however, automated testing runs on the
following versions.

**Tested on NodeJS**: `v21`, `v22`, `v23`.

## TODO

There are a number of features supported by the WhatsApp Business Cloud API that
are yet to be implemented in this SDK.

- [ ] Interactive Message Types.
- [ ] Template Message Types.
- [ ] Considering Authentication usage improvements.

## License

The WhatsApp Business Platform Node.js SDK for the Cloud API is Meta Platforms
licensed, as found in the LICENSE file.
