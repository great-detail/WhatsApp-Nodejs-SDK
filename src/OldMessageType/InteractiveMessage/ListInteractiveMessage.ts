import { InteractiveMessageHeader, InteractiveMessageAction } from ".";
import InteractiveOutgoingMessageType from "./InteractiveOutgoingMessageType";

type ListInteractiveMessage = {
  type: InteractiveOutgoingMessageType.List;
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
