---
"@great-detail/whatsapp": major
---

Update default Meta Graph API version to `v23.0`.

```ts
// To remain on the previous Graph API version:
const sdk = new Client({
  // Add this line to the instantiation options:
  graphVersion: "v20.0",
  // ...
});
```
