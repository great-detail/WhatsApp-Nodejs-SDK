const enum MessageTypesEnum {
  Audio = "audio", // for audio messages.
  Contacts = "contacts", // for contact messages.
  Document = "document", // for document messages.
  Image = "image", // for image messages.
  Interactive = "interactive", // for list and reply button messages.
  Location = "location", // for location messages.
  Reaction = "sticker", // for reaction messages.
  Sticker = "sticker", // for sticker messages.
  Template = "template", // for template messages. Text and media (images and documents) message templates are supported.
  Text = "text", // for text messages.
  Video = "video", // for video messages
}

export default MessageTypesEnum;
