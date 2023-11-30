import { InteractiveMessageAction, InteractiveMessageHeader } from ".";
import InteractiveOutgoingMessageType from "./InteractiveOutgoingMessageType";

type ProductListInteractiveMessage = {
  type: InteractiveOutgoingMessageType.ProductList;
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  header: InteractiveMessageHeader;
  action: InteractiveMessageAction;
};

export default ProductListInteractiveMessage;
