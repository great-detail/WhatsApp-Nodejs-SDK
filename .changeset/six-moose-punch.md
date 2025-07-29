---
"@great-detail/whatsapp": major
---

Remove CLI usage. This change comes as the CLI aspect of this SDK hasn't been
updated since early development and support for later functionality was not
added.

**Sending Text Messages**:

```bash
# Before:
npx @great-detail/whatsapp message send text "<RECIPIENT>" --body="Hello, World!"
```

```ts
// After:
const result = await sdk.message.createMessage({
  phoneNumberID: "123...809",
  to: "1234567890",
  type: "text",
  text: {
    body: "Hello, World!",
    preview_url: true,
  },
});
```

**Upload Media Files**:

```bash
# Before:
npx @great-detail/whatsapp media upload --mime-type="<MIME_TYPE>" < "<FILE_FROM_STDIN>"
```

```ts
// After:
import fs from "fs";
const fileBuffer = fs.readFileSync("<FILE_PATH>");
const result = await sdk.media.upload({
  phoneNumberID: "123...809",
  mimeType: "<MIME_TYPE>",
  file: fileBuffer,
});
```

**Get a Media File's Download URL**:

```bash
# Before:
npx @great-detail/whatsapp media get-url "<MEDIA_ID>"
```

```ts
// After:
const result = await sdk.media.upload({
  phoneNumberID: "123...809",
  mediaID: "<MEDIA_ID>",
});
```

**Download Media Files**:

```bash
# Before:
npx @great-detail/whatsapp media download "<MEDIA_URL>" > "<FILE_PATH>"
```

```ts
// After:
import fs from "fs";
const result = await sdk.media.download("<MEDIA_URL>");
const file = await result.arrayBuffer();
const file = await result.arrayBuffer();
fs.writeFileSync("<FILE_PATH>", Buffer.from(file));
```
