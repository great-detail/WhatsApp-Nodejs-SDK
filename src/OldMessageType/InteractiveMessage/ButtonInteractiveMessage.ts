import { InteractiveMessageAction, InteractiveMessageHeader } from ".";
import InteractiveMessageTypeEnum from "./InteractiveMessageTypeEnum";

type ButtonInteractiveMessage = {
  type: InteractiveMessageTypeEnum.Button;
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  header?: InteractiveMessageHeader;
  action: InteractiveMessageAction;
};

export default ButtonInteractiveMessage;
