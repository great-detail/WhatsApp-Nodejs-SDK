"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParametersTypesEnum = void 0;
const MessageTypesEnum_1 = __importDefault(require("./MessageTypesEnum"));
var ParametersTypesEnum;
(function (ParametersTypesEnum) {
  ParametersTypesEnum["Currency"] = "currency";
  ParametersTypesEnum["DateTime"] = "date_time";
  ParametersTypesEnum["Document"] = "document";
  ParametersTypesEnum["Image"] = "image";
  ParametersTypesEnum["Text"] = "text";
  ParametersTypesEnum["Video"] = "video";
  ParametersTypesEnum["Payload"] = "payload";
})(ParametersTypesEnum || (exports.ParametersTypesEnum = ParametersTypesEnum = {}));
var ButtonTypesEnum;
(function (ButtonTypesEnum) {
  ButtonTypesEnum["QuickReply"] = "quick_reply";
  ButtonTypesEnum["URL"] = "url";
})(ButtonTypesEnum || (ButtonTypesEnum = {}));
var ButtonPositionEnum;
(function (ButtonPositionEnum) {
  ButtonPositionEnum[ButtonPositionEnum["First"] = 0] = "First";
  ButtonPositionEnum[ButtonPositionEnum["Second"] = 1] = "Second";
  ButtonPositionEnum[ButtonPositionEnum["Third"] = 2] = "Third";
})(ButtonPositionEnum || (ButtonPositionEnum = {}));