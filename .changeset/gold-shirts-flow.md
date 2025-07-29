---
"@great-detail/whatsapp": major
---

Reduce bundle size by removing CJS build. NodeJS v20.19.0 and above supports [`require()` for ESM](https://github.com/nodejs/node/releases/tag/v20.19.0) - consumers in a CJS environment should still be able to use library as before, with the current latest LTS NodeJS version.

This update coincides with dropping support for EOL NodeJS v18, thus the minimum supported NodeJS version is now v20.
