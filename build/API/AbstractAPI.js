"use strict";

var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractAPI_parent;
Object.defineProperty(exports, "__esModule", {
  value: true
});
class AbstractAPI {
  constructor(businessId, parent, _logger) {
    this.businessId = businessId;
    this._logger = _logger;
    _AbstractAPI_parent.set(this, void 0);
    __classPrivateFieldSet(this, _AbstractAPI_parent, parent, "f");
  }
  getParentEndpoint() {
    if (__classPrivateFieldGet(this, _AbstractAPI_parent, "f") instanceof AbstractAPI) {
      return __classPrivateFieldGet(this, _AbstractAPI_parent, "f").getEndpoint();
    }
    return;
  }
  joinEndpoints(...endpoints) {
    return endpoints.filter(endpoint => typeof endpoint === "string").map(endpoint => {
      let trimmedEndpoint = endpoint;
      if (trimmedEndpoint.startsWith("/")) {
        trimmedEndpoint = trimmedEndpoint.slice(1);
      }
      if (trimmedEndpoint.endsWith("/")) {
        trimmedEndpoint = trimmedEndpoint.slice(0, -1);
      }
      return trimmedEndpoint;
    }).join("/");
  }
}
_AbstractAPI_parent = new WeakMap();
exports.default = AbstractAPI;
module.exports = exports.default;