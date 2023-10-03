import ComponentTypesEnum from "./ComponentTypesEnum";
import CurrencyCodesEnum from "./CurrencyCodesEnum";
import LanguagesEnum from "./LanguagesEnum";
import DocumentObjectMediaMessageType from "./MediaMessage/DocumentMediaMessageType";
import ImageObjectMediaMessageType from "./MediaMessage/ImageMediaMessageType";
import VideoObjectMediaMessageType from "./MediaMessage/VideoMediaMessageType";
import MessageRequestBodyType from "./MessageType";
import MessageTypesEnum from "./MessageTypesEnum";
export declare const enum ParametersTypesEnum {
    Currency = "currency",
    DateTime = "date_time",
    Document = "document",
    Image = "image",
    Text = "text",
    Video = "video",
    Payload = "payload"
}
type LanguageObject = {
    policy: "deterministic";
    code: LanguagesEnum;
};
type ParametersObject<T extends ParametersTypesEnum> = {
    type: T;
};
type TextParametersObject = ParametersObject<ParametersTypesEnum.Text> & {
    text: string;
};
type CurrencyObject = {
    fallback_value: string;
    code: CurrencyCodesEnum;
    amount_1000: number;
};
type CurrencyParametersObject = ParametersObject<ParametersTypesEnum.Currency> & {
    currency: CurrencyObject;
};
type DateTimeObject = {
    fallback_value: string;
};
type DateTimeParametersObject = ParametersObject<ParametersTypesEnum.Currency> & {
    date_time: DateTimeObject;
};
type DocumentParametersObject = ParametersObject<ParametersTypesEnum.Document> & DocumentObjectMediaMessageType;
type ImageParametersObject = ParametersObject<ParametersTypesEnum.Image> & ImageObjectMediaMessageType;
type VideoParametersObject = ParametersObject<ParametersTypesEnum.Video> & VideoObjectMediaMessageType;
type QuickReplyButtonParametersObject = {
    type: ParametersTypesEnum.Payload;
    payload: string;
};
type URLButtonParametersObject = {
    type: ParametersTypesEnum.Text;
    text: string;
};
type ButtonParameterObject = QuickReplyButtonParametersObject | URLButtonParametersObject;
type ComponentObject<T extends ComponentTypesEnum> = {
    type: T;
    parameters: (CurrencyParametersObject | DateTimeParametersObject | DocumentParametersObject | ImageParametersObject | TextParametersObject | VideoParametersObject)[];
};
declare const enum ButtonTypesEnum {
    QuickReply = "quick_reply",
    URL = "url"
}
declare const enum ButtonPositionEnum {
    First = 0,
    Second = 1,
    Third = 2
}
type ButtonComponentObject = ComponentObject<ComponentTypesEnum.Button> & {
    parameters: ButtonParameterObject;
    sub_type: ButtonTypesEnum;
    index: ButtonPositionEnum;
};
export type TemplateObjectMessageType<T extends ComponentTypesEnum> = {
    name: string;
    language: LanguageObject;
    components?: (ComponentObject<T> | ButtonComponentObject)[];
};
type TemplateMessageType<T extends ComponentTypesEnum> = MessageRequestBodyType<MessageTypesEnum.Template> & {
    [MessageTypesEnum.Template]: TemplateObjectMessageType<T>;
};
export default TemplateMessageType;
