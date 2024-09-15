# `@great-detail/whatsapp`

## 6.10.7

### Patch Changes

- 9bea58a: Update dependencies

## 6.10.6

### Patch Changes

- dd8f9e3: Remove src from distributed files

## 6.10.5

### Patch Changes

- f0457a4: bump dependencies

## 6.10.4

### Patch Changes

- ac3661b: bump dependencies

## 6.10.3

### Patch Changes

- 47d1827: bump dependencies

## 6.10.2

### Patch Changes

- 60377af: Update default Meta Graph API version to v20.0

## 6.10.1

### Patch Changes

- 6a13a44: correct encapsulation in GraphRequest class

## 6.10.0

### Minor Changes

- 8db15ae: encapsulate request and response objects. replaces class-based
  inheritance.

### Patch Changes

- bae08fd: update dependencies

## 6.9.14

### Patch Changes

- 634faaf: bump typescript

## 6.9.13

### Patch Changes

- c20f756: bump dependencies

## 6.9.12

### Patch Changes

- e2e31d8: bump dependencies

## 6.9.11

### Patch Changes

- 4ce41e4: bump dependencies

## 6.9.10

### Patch Changes

- ac20c25: bump dependencies

## 6.9.9

### Patch Changes

- 57098b6: bump dependencies

## 6.9.8

### Patch Changes

- 3d68ec7: bump dependencies

## 6.9.7

### Patch Changes

- dbe8c3c: bump dependencies

## 6.9.6

### Patch Changes

- 2327b8e: bump dependencies

## 6.9.5

### Patch Changes

- 78fded2: bump dependencies
- 4b2931a: update default Graph API version from `v18` to `v19`

## 6.9.4

### Patch Changes

- f73b51a: feat: export `WebhookAPIEventNotificationReturn`

## 6.9.3

### Patch Changes

- fe3dd22: feat: export `WebhookAPIRegisterReturn`

## 6.9.2

### Patch Changes

- 803fb4e: revert: remove SHA-1 integrity checking

## 6.9.1

### Patch Changes

- 2d71b9f: feat: check SHA-1 integrity signature in addition to SHA-256
  signature

## 6.9.0

### Minor Changes

- 7f7fece: refactor: decouple SDK from routing for compatibility further than
  ExpressJS

### Patch Changes

- a1c6cb7: bump dependencies

## 6.8.6

### Patch Changes

- efc4f51: bump dependencies

## 6.8.5

### Patch Changes

- 46c53b4: bump dependencies

## 6.8.4

### Patch Changes

- c2ec105: add `CloudAPIMedia#verifySha256` helper method to ensure downloaded
  media file integrity

## 6.8.3

### Patch Changes

- c2b50cf: correct spelling error of `mime_type` in `MediaURL` type

## 6.8.2

### Patch Changes

- c2707b1: add `message send media` command
- 908b5c7: use `cross-fetch`'s `Request` and `Response` over incompatible native
  objects

## 6.8.1

### Patch Changes

- 074a335: add `cross-fetch` in place of native `fetch` use. Introduces support
  for browser + node interoperability
- 6d8be2e: remove bug-related use of `axios` over fetch in favour of
  `cross-fetch`

## 6.8.0

### Minor Changes

- c1ab76f: rename `businessID` parameter for `CloudAPIMessage` to
  `phoneNumberID`

### Patch Changes

- 01c1265: bump dependencies
- 3e7b04d: allow media file downloading via CLI

## 6.7.0

### Minor Changes

- 0c75799: introduce command line interface for operating WhatsApp operations
- 1341b78: use `tsup` to provide full CJS+ESM transpilation and support
- 9b095c5: Add media file handling for Image/Video/Document message support
- 7587307: move requestOptions option for `CloudAPIMessage#createStatus` inside
  options object. Update use from
  `CloudAPIMessage.createStatus(/* ... */, requestOptions)` to
  `CloudAPIMessage.createStatus(/* ... */, { requestOptions })`.

### Patch Changes

- 7a08e88: add default value for CloudAPI constructor parameters
- 7587307: allow options objects to be omitted where not required in
  `CloudAPIMessage#createStatus`

## 6.6.3

### Patch Changes

- b534212: bump dependencies

## 6.6.2

### Patch Changes

- 06c14f0: chore: move @changesets/cli to devDependencies

## 6.6.1

### Patch Changes

- 2ec69a4: bump dependencies

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

- 8056f1f: bump dependencies

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

- 53b72ae: bump dependencies

## 6.1.0

### Minor Changes

- 2eb8f91: Introduce On-Premises API Compatibility

### Patch Changes

- 4611d88: add base for URL in webhook registration method

## 6.0.3

### Patch Changes

- 914d664: bump dependencies

## 6.0.2

### Patch Changes

- c4a11b8: Add empty object default for `CloudAPI.message` method

## 6.0.1

### Patch Changes

- 89aeb49: Move Versioning Process to Changesets
