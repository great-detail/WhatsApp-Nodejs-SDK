import { InteractiveMessageAction, InteractiveMessageHeader } from ".";
import InteractiveOutgoingMessageType from "./InteractiveOutgoingMessageType";

type ButtonInteractiveMessage = {
  type: InteractiveOutgoingMessageType.Button;
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
