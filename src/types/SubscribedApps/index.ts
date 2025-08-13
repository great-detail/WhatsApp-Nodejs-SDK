/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import { BusinessAccountID } from "../WhatsappBusinessAccount/index.js";

export type CreateSubscriptionOptions = {
  businessAccountID: BusinessAccountID;
};

export type CreateSubscriptionPayload = {
  success: boolean;
};

export type ListSubscriptionsOptions = {
  businessAccountID: BusinessAccountID;
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
