---
"@great-detail/whatsapp": minor
---

Allow authentication headers to be set globally, on SDK client instantiation:

```ts
// The following is now supported:
const sdk = new Client({
  request: {
    headers: {
      Authorization: "Bearer ...",
    },
  },
});

const message = await sdk.message.createMessage({
  // ...
  // request: {...} can be omitted
});

// The older method remains supported and allows authentication to be overriden
// at a per-request level:
const sdk = new Client();
const message = await sdk.message.createMessage({
  // ...
  request: {
    headers: {
      Authorization: "Bearer ...",
    },
  },
});
```
