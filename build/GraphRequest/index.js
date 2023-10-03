"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const GraphResponse_1 = __importDefault(require("../GraphResponse"));
const constants_1 = require("../constants");
class GraphRequest extends Request {
  constructor({
    endpoint = "/",
    version = constants_1.DEFAULT_GRAPH_VERSION,
    baseUrl = constants_1.DEFAULT_GRAPH_API_BASE_URL,
    ...requestInit
  }) {
    super(new URL([version ? "/" : "", version, endpoint].join(""), baseUrl), {
      ...requestInit
    });
    this.endpoint = endpoint;
    this.version = version;
    this.baseUrl = baseUrl;
  }
  async send() {
    return await fetch(this).then(({
      body,
      status,
      statusText,
      headers
    }) => new GraphResponse_1.default(body, {
      status,
      statusText,
      headers
    }));
  }
}
exports.default = GraphRequest;
module.exports = exports.default;