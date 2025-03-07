/**
 * WhatsApp NodeJS SDK.
 *
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

export type CreateMessageText = {
  body: string;
  preview_url?: boolean;
};

export type EventNotificationMessageText = {
  body: string;
};
