import { InteractiveMessageAction, InteractiveMessageHeader } from ".";
import InteractiveMessageTypeEnum from "./InteractiveMessageTypeEnum";

type ProductListInteractiveMessage = {
  type: InteractiveMessageTypeEnum.ProductList;
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
