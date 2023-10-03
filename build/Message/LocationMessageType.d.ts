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
