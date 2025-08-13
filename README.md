# WhatsApp Business Platform API SDK for Node.JS, Deno & Bun

[![npm (scoped)][]][sdk-npmjs]

[npm (scoped)]: https://img.shields.io/npm/v/%40great-detail/whatsapp
[sdk-npmjs]: https://www.npmjs.com/package/@great-detail/whatsapp

The unofficial SDK for Meta's WhatsApp Business Messaging APIs - Cloud API.
Originally a fork of the
[deprecated official SDK for Meta's WhatsApp Business Messaging APIs](https://github.com/WhatsApp/WhatsApp-Nodejs-SDK).
Supports webhooks, phone number management, whatsapp business account
management, template management, messaging, webhook subscription management.

If you find a bug or have a feature request, please
[open an issue](https://github.com/great-detail/WhatsApp-JS-SDK/issues).
[Contributions](#contributing) are **greatly** appreciated too!

See this SDK's
[Changelog](https://github.com/great-detail/WhatsApp-JS-SDK/blob/main/CHANGELOG.md)
for updates and release notes.

## Installation

Install the WhatsApp Business Platform SDK:

```bash
# NPM:
npm install @great-detail/whatsapp
# ^ or use PNPM, Yarn, Bun

# Deno:
deno add npm:@great-detail/whatsapp
```

## Getting started

The primary source of documentation (at the moment) for the usage of this SDK is
via JSDoc comments in the source code (and editor integrations).

```ts
import Client from "@great-detail/whatsapp"; // for ESM environments
// require("@great-detail/whatsapp"); // for CJS environments
// import Client from "npm:@great-detail/whatsapp"; // for Deno

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

This SDK is designed to be compatible with the Cloud API API. Some fields used
by the
[On-Premises API](https://developers.facebook.com/docs/whatsapp/on-premises/sunset/)
may be included, however, no on-premises-only functionality is implemented.

| SDK  | Cloud API |
| :--- | --------: |
| v8.x |       v23 |

Whilst the SDK may work with alternative versions of the Graph API, it is
designed to work with the above. If you find any compatibility issues, please
report them via
[GitHub Issues](https://github.com/great-detail/WhatsApp-JS-SDK/issues).

See this SDK's
[Changelog](https://github.com/great-detail/WhatsApp-JS-SDK/blob/main/CHANGELOG.md)
for updates and release notes.

- **Tested on NodeJS LTS Versions**: `v22`, `v24`,
- **Tested on Deno LTS Versions**: `v2.4`,
- **Tested on Bun Versions**: `v1.2`.

Additional NodeJS versions may also work, however, automated testing requires
NodeJS' test suite, which was introduced in `v21`. Other versions of Deno/Bun
may also work, regardless of NodeJS polyfill support - uses SubtleCrypto.

## Migrating v7 to v8

v8 of this SDK increased the minimum supported NodeJS version to v20.19.0,
alongside the release of support for
[`require()` with ESM](https://github.com/nodejs/node/releases/tag/v20.19.0).
This also coincides with NodeJS v18 reaching EOL, thus making the minimum LTS
NodeJS version v20.

This update to the minimum supported NodeJS version allows us to greatly
decrease the bundle size due to releasing ESM-only builds. Consumers in a CJS
environment should
[still be able to use the library as before](https://github.com/nodejs/node/releases/tag/v20.19.0).

v8 also removes the CLI aspect of this package. This change comes as the CLI
aspect of this SDK hasn't been updated since early development and support for
later functionality was not added. This too allows for a reduction in bundle
size.

v8 of this SDK also updates the default Meta Graph API version to `v23.0` -
whilst this update should maintain compatibility, to remain on the previous
Graph API version (`v20.0`) update instantiation of this client as follows:

```ts
// To remain on the previous Graph API version:
const sdk = new Client({
  // Add this line to the instantiation options:
  graphVersion: "v20.0",
  // ...
});
```

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

**Create a Template Message**:

```ts
const message = await sdk.message.createMessage({
  phoneNumberID: "123...809",
  to: "1234567890",
  type: "template",
  template: {
    name: "test_1",
    language: { code: "en_US" },
    components: [
      {
        type: "body",
        parameters: [
          // Add some parameters:
          { type: "text", text: "Example" },
          {
            type: "currency",
            currency: {
              fallback_value: "£100",
              code: "GBP",
              amount_1000: 100_000,
            },
          },
          {
            type: "date_time",
            date_time: {
              fallback_value: "2026-01-01",
            },
          },
        ],
      },
    ],
  },
});
```

**Upload Media Files**:

```ts
import fs from "fs";
const fileBuffer = fs.readFileSync("<FILE_PATH>");
const result = await sdk.media.upload({
  phoneNumberID: "123...809",
  mimeType: "<MIME_TYPE>",
  file: fileBuffer,
});
```

**Get a Media File's Download URL**:

```ts
const result = await sdk.media.upload({
  phoneNumberID: "123...809",
  mediaID: "<MEDIA_ID>",
});
```

**Download Media Files**:

```ts
import fs from "fs";
const result = await sdk.media.download("<MEDIA_URL>");
const file = await result.arrayBuffer();
fs.writeFileSync("<FILE_PATH>", Buffer.from(file));
```

**Listen for Webhook Requests with Express**:

```ts
// Registration requests:
app.get("/path/to/webhook", async (req, res) => {
  const reg = await sdk.webhook.register({
    method: request.method,
    query: req.query,
    body: req.body,
    headers: req.headers,
  });
  // DIY: Check the reg.verifyToken value
  if (reg.verifyToken !== "abcd") {
    return res.end(reg.reject());
  }
  return res.end(reg.accept());
});

// Event Notification requests:
app.use(express.raw()); // Important <-
app.post("/path/to/webhook", async (req, res) => {
  const event = sdk.webhook.eventNotification({
    method: request.method,
    query: req.query,
    body: req.body.toString(),
    headers: req.headers,
  });
  // DIY: Load the Meta App Secret
  event.verifySignature("abcd-app-secret");
  // Non-200 status codes will be retried
  // You may want to use the dreaded "successful error"
  if (someFailedCondition) {
    res.status(400);
    return res.end();
  }
  return res.end(event.accept());
});
```

**Listen for Webhook Requests with Fastify**:

```ts
// Registration requests:
fastify.route({
  method: "GET",
  url: "/path/to/webhook",
  handler: (request, reply) => {   *
    const reg = await sdk.webhook.register({
      method: request.method,
      query: request.query,
      body: undefined,
      headers: request.headers,
    });
    // DIY: Check the reg.verifyToken value
    if (reg.verifyToken !== "abcd") {
      return reply.send(reg.reject());
    }
    return reply.send(reg.accept());
  }
});

// Event Notification requests:
// See: https://github.com/fastify/fastify/issues/707#issuecomment-817224931
fastify.addContentTypeParser("application/json", { parseAs: "buffer" }, (_req, body, done) => {
  done(null, body);
});

fastify.route({
  method: "POST",
  url: "/path/to/webhook",
  handler: (request, reply) => {
    // This SDK handles inbound webhook requests from a string for signature verification
    assert(Buffer.isBuffer(request.body) || typeof request.body === "string");
    const body = request.body.toString();

    const event = sdk.webhook.eventNotification({
      method: request.method,
      query: request.query,
      body,
      headers: request.headers,
    });
    // DIY: Load the Meta App Secret
    event.verifySignature("abcd-app-secret");
    // Non-200 status codes will be retried
    // You may want to use the dreaded "successful error"
    if (someFailedCondition) {
      return reply.code(400).send();
    }
    return reply.send(event.accept());
  }
});
```

**Listen for Webhook Requests with Oak**:

```ts
// Registration requests:
router.get("/path/to/webhook", async (context) => {
  const reg = await sdk.webhook.register({
    method: context.request.method,
    query: Object.fromEntries(context.request.url.searchParams),
    body: undefined,
    headers: Object.fromEntries(context.request.headers),
  });
  // DIY: Check the reg.verifyToken value
  if (reg.verifyToken !== "abcd") {
    context.response.body = reg.reject();
    return;
  }
  context.response.body = reg.accept();
});

// Event Notification requests:
router.post("/path/to/webhook", async (context) => {
  const body = await context.request.body({ type: "text" }).value;
  const event = sdk.webhook.eventNotification({
    method: context.request.method,
    query: Object.fromEntries(context.request.url.searchParams),
    body,
    headers: Object.fromEntries(context.request.headers),
  });
  // DIY: Load the Meta App Secret
  event.verifySignature("abcd-app-secret");
  // Non-200 status codes will be retried
  // You may want to use the dreaded "successful error"
  if (someFailedCondition) {
    context.response.status = 400;
    context.response.body = "";
    return;
  }
  context.response.body = event.accept();
});
```

## Contributing

Contributions are **greatly** appreciated - especially surrounding API updates
and type correction! To get started:

1. **Fork** the repository and create your branch from `main`.
2. **Write clear, well-documented code** and include tests where possible.
3. **Open a pull request** describing your changes and referencing any related
   issues.

Please review our
[Code of Conduct](https://github.com/great-detail/WhatsApp-JS-SDK/blob/main/CODE_OF_CONDUCT.md)
before submitting.

If you find a bug or have a feature request, please
[open an issue](https://github.com/great-detail/WhatsApp-JS-SDK/issues).

## License

[MIT © Great Detail Ltd](https://github.com/great-detail/WhatsApp-JS-SDK/blob/main/LICENSE)

Originally forked from the official WhatsApp SDK created by Rashed Talukder.

### Contact

This SDK was originally forked from the
[deprecated official SDK](https://github.com/WhatsApp/WhatsApp-Nodejs-SDK) and
is now maintained by Great Detail.

**Great Detail Ltd**: https://greatdetail.com <info@greatdetail.com>

## TODO

There are a number of features supported by the WhatsApp Business Cloud API and
WhatsApp Business Management API that are yet to be implemented in this SDK.
Please feel free to contribute via a Pull Request, or note your interest in
particular features by creating an issue for it.

- [ ] Interactive Message Types,
- [x] Template Message Types,
- [ ] Template Management,
- [ ] Button Message Types,
- [ ] Flow Message Types,
- [ ] List Message Types,
- [x] WABA Webhook Subscription Management,
- [ ] WABA Extended Credit Management,
- [x] WABA Phone Number Management,
- [ ] WABA System User Management?
