import MessageRequestBodyType from "./MessageType";
import MessageTypesEnum from "./MessageTypesEnum";
type AddressesObjectMessageType = {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    country_code?: string;
    type?: "HOME" | "WORK" | string;
};
type EmailObjectMessageType = {
    email?: string;
    type?: "HOME" | "WORK" | string;
};
type NameObjectMessageType = {
    formatted_name: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    suffix?: string;
    prefix?: string;
};
type OrgObjectMessageType = {
    company?: string;
    department?: string;
    title?: string;
};
type PhoneObjectMessageType = {
    phone?: "PHONE_NUMBER";
    type?: "CELL" | "MAIN" | "IPHONE" | "HOME" | "WORK" | string;
    wa_id?: string;
};
type URLObjectMessageType = {
    url?: string;
    type?: "HOME" | "WORK" | string;
};
export interface ContactsObjectMessageType {
    addresses?: AddressesObjectMessageType[];
    birthday?: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
    emails?: EmailObjectMessageType[];
    name: NameObjectMessageType;
    org?: OrgObjectMessageType;
    phones?: PhoneObjectMessageType[];
    urls?: URLObjectMessageType[];
}
type ContactsMessageType = MessageRequestBodyType<MessageTypesEnum.Contacts> & {
    [MessageTypesEnum.Audio]: [ContactsObjectMessageType];
};
export default ContactsMessageType;
