"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const AbstractAPI_1 = __importDefault(require("../API/AbstractAPI"));
const MessageAPI_1 = __importDefault(require("../MessageAPI"));
const constants_1 = require("../constants");
/**
 * WhatsApp API.
 *
 * @since 0.0.6
 * @author Dom Webber <dom.webber@hotmail.com>
 */
class WhatsAppAPI extends AbstractAPI_1.default {
  constructor(businessId, version = constants_1.DEFAULT_GRAPH_VERSION, baseUrl = constants_1.DEFAULT_GRAPH_API_BASE_URL, logger) {
    super(businessId, undefined, logger);
    this.version = version;
    this.baseUrl = baseUrl;
    this.version = version;
    this.baseUrl = baseUrl;
    this.message = new MessageAPI_1.default(this.businessId, this, this._logger);
  }
  getEndpoint() {
    return `${this.version}/`;
  }
}
exports.default = WhatsAppAPI;
module.exports = exports.default;