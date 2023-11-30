import { InteractiveMessageAction, InteractiveMessageHeader } from ".";
import InteractiveMessageTypeEnum from "./InteractiveMessageTypeEnum";

type ProductInteractiveMessage = {
  type: InteractiveMessageTypeEnum.Product;
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
