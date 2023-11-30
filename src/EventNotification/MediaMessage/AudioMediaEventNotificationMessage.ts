/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { AudioObjectMediaMessageType } from "../../OldMessageType/MediaMessage/AudioMediaMessageType";
import MessageTypesEnum from "../../OldMessageType/MessageTypesEnum";
import EventNotificationMessage from "../EventNotificationMessage";

type AudioMediaEventNotificationMessage =
  EventNotificationMessage<MessageTypesEnum.Audio> & {
    [MessageTypesEnum.Audio]: AudioObjectMediaMessageType;
  };
export default AudioMediaEventNotificationMessage;
