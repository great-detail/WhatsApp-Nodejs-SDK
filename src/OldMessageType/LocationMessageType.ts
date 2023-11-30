/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import MessageRequestBodyType from "./MessageType";
import MessageTypesEnum from "./MessageTypesEnum";

export interface LocationObjectMessageType {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

type LocationMessageType = MessageRequestBodyType<MessageTypesEnum.Location> & {
  [MessageTypesEnum.Location]: [LocationObjectMessageType];
};
export default LocationMessageType;
