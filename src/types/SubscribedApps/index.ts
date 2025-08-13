/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { WhatsappBusinessAccountID } from "../WhatsappBusinessAccount/index.js";

export type CreateSubscriptionOptions = {
  businessAccountID: WhatsappBusinessAccountID;
} & (
  | {
      override_callback_uri: string;
      verify_token: string;
    }
  | {
      override_callback_uri?: never;
      verify_token?: string;
    }
);

export type CreateSubscriptionPayload = {
  success: boolean;
};

export type ListSubscriptionsOptions = {
  businessAccountID: WhatsappBusinessAccountID;
};

export type ListSubscriptionsPayload = {
  data: {
    whatsapp_business_api_data: {
      id: string;
      link?: string | null;
      name: string;
    };
  }[];
};
