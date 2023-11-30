import EventNotificationMessage from "../EventNotificationMessage";

type ButtonInteractiveMessage = EventNotificationMessage<"button"> & {
  button: {
    /**
     * The payload for a button set up by the business that a customer clicked as
     * part of an interactive message.
     *
     * @since 4.2.0
     */
    payload: string;

    /**
     * Button text.
     *
     * @since 4.2.0
     */
    text: string;
  };
};

export default ButtonInteractiveMessage;
