"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractiveTypesEnum = void 0;
const MessageTypesEnum_1 = __importDefault(require("./MessageTypesEnum"));
var InteractiveTypesEnum;
(function (InteractiveTypesEnum) {
  InteractiveTypesEnum["Button"] = "button";
  InteractiveTypesEnum["List"] = "list";
  InteractiveTypesEnum["Product"] = "product";
  InteractiveTypesEnum["ProductList"] = "product_list";
})(InteractiveTypesEnum || (exports.InteractiveTypesEnum = InteractiveTypesEnum = {}));