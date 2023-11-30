import { InteractiveMessageHeader, InteractiveMessageAction } from ".";
import InteractiveMessageTypeEnum from "./InteractiveMessageTypeEnum";

type ListInteractiveMessage = {
  type: InteractiveMessageTypeEnum.List;
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  header?: InteractiveMessageHeader;
  action: InteractiveMessageAction;
};

export default ListInteractiveMessage;
