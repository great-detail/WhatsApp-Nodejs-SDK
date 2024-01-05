# `@great-detail/whatsapp`

## 6.6.0

### Minor Changes

- aa455aa: refactor: rename `requestProps` of `CreateMessageOptionsType` to
  `requestOptions`

### Patch Changes

- 3599139: refactor: add missing response messages.message_status field typing
- f531a68: refactor: add `error` as parameter in response to message sending
- 5b9bf96: refactor: add `group` as a suggested value to
  `OutgoingMessage.recipient_type`
- f05ab0c: fix: correct GraphResponse typing for createStatus method

## 6.5.2

### Patch Changes

- d3e7d5d: fix: correct usable node versions to >=18.x
- 273f996: fix: remove requestInit passing to fetch call

## 6.5.1

### Patch Changes

- 1f3f833: fix: allow header merging when using GraphRequest.send method

## 6.5.0

### Minor Changes

- 5b89c1e: refactor: revamp internal GraphRequest construction with version,
  endpoint, baseUrl visibility

### Patch Changes

- 7d9ff48: refactor: remove on-premises API related types
- b93f020: feat: introduce isUpgraded dynamic property on GraphResponse,
  indicative of API versioning upgrades

## 6.4.8

### Patch Changes

- 3a01264: refactor: pass class logger instance to GraphRequest.create calls

## 6.4.7

### Patch Changes

- ca0120e: feat: allow passing logger to GraphRequest.create

## 6.4.6

### Patch Changes

- c8762c5: fix: use ESM only

## 6.4.5

### Patch Changes

- 53e649c: fix: correct syntax for mjs exports

## 6.4.4

### Patch Changes

- 4cf5ca7: fix: use ESM import file extension syntax
- ec8c018: fix: default `package.json#type` to `module`

## 6.4.3

### Patch Changes

- c132743: fix: re-instate building process from v6.3.2

## 6.4.2

### Patch Changes

- df0a0aa: fix: add `package.json#main`
- 92fdc50: fix: combine types and esmodule outputs in dist directory

## 6.4.1

### Patch Changes

- bbe381d: use es modules only

## 6.4.0

### Minor Changes

- c23a171: use module as primary package type

## 6.3.2

### Patch Changes

- 8056f1f: build(deps-dev): bump eslint-plugin-jsdoc from 46.9.1 to 47.0.1
- d43be6c: build(deps-dev): bump @types/node from 20.10.5 to 20.10.6
- 22a9199: build(deps-dev): bump cspell from 8.2.4 to 8.3.0
- a8c9102: build(deps-dev): bump @swc/core from 1.3.101 to 1.3.102
- cbc468f: build(deps-dev): bump @eslint/eslintrc from 2.1.4 to 3.0.0

## 6.3.1

### Patch Changes

- c01558f: updated readme to clarify unofficial relational standing

## 6.3.0

### Minor Changes

- 6b323d7: introduce multi-module compilation for cjs and mjs support

## 6.2.1

### Patch Changes

- 3c1d164: use `@great-detail/prettier-config`

## 6.2.0

### Minor Changes

- 4faaa2c: remove start of on-premises API

### Patch Changes

- 53b72ae: build(deps-dev): bump @types/jest from 29.5.10 to 29.5.11
- 6d13401: build(deps-dev): bump cspell from 8.1.3 to 8.2.4
- 9e4d740: build(deps-dev): bump @typescript-eslint/parser from 6.13.2 to 6.16.0
- 1027c91: build(deps-dev): bump eslint from 8.55.0 to 8.56.0
- 45ed5be: build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.13.2 to
  6.15.0

## 6.1.0

### Minor Changes

- 2eb8f91: Introduce On-Premises API Compatibility

### Patch Changes

- 4611d88: add base for URL in webhook registration method

## 6.0.3

### Patch Changes

- 914d664: bump `eslint-plugin-jsdoc` from `46.9.0` to `46.9.1`
- 47046d2: bump `@babel/core` from `7.23.5` to `7.23.6`
- 79d4d78: bump `@types/node` from `20.10.3` to `20.10.5`
- de6edf3: bump `@babel/preset-env` from `7.23.5` to `7.23.6`

## 6.0.2

### Patch Changes

- c4a11b8: Add empty object default for `CloudAPI.message` method

## 6.0.1

### Patch Changes

- 89aeb49: Move Versioning Process to Changesets
