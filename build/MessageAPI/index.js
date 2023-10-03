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
const GraphRequest_1 = __importDefault(require("../GraphRequest"));
/**
 * WhatsApp Message API.
 *
 * @since 0.0.6
 * @author Dom Webber <dom.webber@hotmail.com>
 */
class MessageAPI extends AbstractAPI_1.default {
  getEndpoint() {
    return this.joinEndpoints(this.getParentEndpoint(), this.businessId, "messages");
  }
  createStatusRead(payload, requestProps = {}) {
    const body = {
      messaging_product: "whatsapp",
      ...payload
    };
    return new GraphRequest_1.default({
      ...requestProps,
      endpoint: this.getEndpoint(),
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...requestProps.headers,
        "Content-Type": "application/json"
      }
    });
  }
  createMessage(type, payload, toNumber, replyMessageId, requestProps = {}) {
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: toNumber,
      type: type,
      [type]: payload
    };
    if (replyMessageId) body["context"] = {
      message_id: replyMessageId
    };
    return new GraphRequest_1.default({
      ...requestProps,
      endpoint: this.getEndpoint(),
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...requestProps.headers,
        "Content-Type": "application/json"
      }
    });
  }
}
exports.default = MessageAPI;
module.exports = exports.default;