---
"@great-detail/whatsapp": major
---

Refactor & Rewrite SDK.

**Before**:

```ts
import CloudAPI from "@great-detail/whatsapp";

const sdk = new CloudAPI();
const message = sdk
  .message({ phoneNumberID: "123...809" })
  .text({ body: "Hello" }, { toNumber: "1234567890" });
const sendReceipt = await message.send();
```

**After**:

```ts
import Client from "@great-detail/whatsapp";

const sdk = new Client();
const message = await sdk.message.createMessage({
  phoneNumberID: "123...809",
  to: "1234567890",
  type: "text",
  text: {
    body: "Hello",
  },
});
```
