/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { WhatsappError } from "./Error.js";
import { MessageID, MessageStatusType } from "./Message/index.js";
import { PhoneNumberID } from "./PhoneNumber.js";

export type CreateStatusOptions = {
  phoneNumberID: PhoneNumberID;
  message_id: MessageID;
  status: MessageStatusType;
  typing_indicator?: {
    type: "text";
  };
  [key: string]: unknown | undefined;
};

export type CreateStatusPayload = {
  success?: boolean;
  error: WhatsappError;
};
