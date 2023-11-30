import { InteractiveMessageAction, InteractiveMessageHeader } from ".";
import InteractiveOutgoingMessageType from "./InteractiveOutgoingMessageType";

type ProductInteractiveMessage = {
  type: InteractiveOutgoingMessageType.Product;
  body?: {
    text: string;
  };
  footer?: {
    text: string;
  };
  header?: InteractiveMessageHeader;
  action: InteractiveMessageAction;
};

export default ProductInteractiveMessage;
