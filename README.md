# Node.js SDK for WhatsApp Business Platform APIs

An unofficial SDK for Meta's WhatsApp Business Messaging APIs - Cloud API.
Originally a fork of the
[deprecated official SDK for Meta's WhatsApp Business Messaging APIs](https://github.com/WhatsApp/WhatsApp-Nodejs-SDK).

[![npm (scoped)][]][sdk-npmjs]

[npm (scoped)]: https://img.shields.io/npm/v/%40great-detail/whatsapp
[sdk-npmjs]: https://www.npmjs.com/package/@great-detail/whatsapp

## Installation

Install the WhatsApp Business Platform SDK:

```bash
npm install @great-detail/whatsapp
# or PNPM or Yarn
```

## Getting started

```ts
import Client from "@great-detail/whatsapp"; // or require("@great-detail/whatsapp");

const sdk = new Client();
const message = await sdk.message.createMessage({
  phoneNumberID: "123...809",
  to: "1234567890",
  type: "text",
  text: { body: "Hello" },
  request: {
    headers: {
      Authorization: "Bearer ...",
    },
  },
});
```

## CLI Usage

```bash
export WHATSAPP_ACCESS_TOKEN=""
export WHATSAPP_PHONE_NUMBER_ID=""

# NPM / Yarn / PNPM
npx @great-detail/whatsapp ...
yarn dlx @great-detail/whatsapp ...
pnpx @great-detail/whatsapp ...

# Send a Text Message
# TODO: Re-add with updated SDK
npx @great-detail/whatsapp message send text "<RECIPIENT>" --body="Hello, World!"
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

| SDK  | Cloud API | NodeJS |
| :--- | :-------: | -----: |
| v8.x |    v23    |   v20+ |

Whilst the SDK may work with alternative versions of the Graph API, it is
designed to work with the above. If you find any compatibility issues, please
report them via
[GitHub Issues](https://github.com/great-detail/WhatsApp-Nodejs-SDK/issues).

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
