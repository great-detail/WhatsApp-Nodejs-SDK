#!/usr/bin/env node

/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { program } from "commander";
import getStdin from "get-stdin";
import Client from "./Client.js";
import { MessageType } from "./types/Message/MessageType.js";

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const sdk = new Client();
program.name("whatsapp").description("WhatsApp SDK CLI");

const mediaCommand = program.command("media").description("Media");

mediaCommand
  .command("download")
  .description("Download Media")
  .argument("<MEDIA_URL>", "Media URL")
  .requiredOption(
    "--access-token <ACCESS_TOKEN>",
    "WhatsApp Access Token",
    WHATSAPP_ACCESS_TOKEN,
  )
  .action(async (mediaURL) => {
    const result = await sdk.media.download(mediaURL);
    const file = await result.arrayBuffer();
    const fileBuffer = Buffer.from(file);
    process.stdout.write(fileBuffer);
  });

mediaCommand
  .command("delete")
  .description("Delete Media")
  .argument("<MEDIA_ID>", "Media ID")
  .option(
    "--phone-number-id <PHONE_NUMBER_ID>",
    "From Phone Number ID",
    WHATSAPP_PHONE_NUMBER_ID,
  )
  .requiredOption(
    "--access-token <ACCESS_TOKEN>",
    "WhatsApp Access Token",
    WHATSAPP_ACCESS_TOKEN,
  )
  .action(async (mediaID, options) => {
    const result = await sdk.media.delete({
      mediaID,
      phoneNumberID: options.phoneNumberId,
    });
    console.log(await result.json());
  });

mediaCommand
  .command("get-url")
  .description("Get Media URL")
  .argument("<MEDIA_ID>", "Media ID")
  .option(
    "--phone-number-id <PHONE_NUMBER_ID>",
    "From Phone Number ID",
    WHATSAPP_PHONE_NUMBER_ID,
  )
  .requiredOption(
    "--access-token <ACCESS_TOKEN>",
    "WhatsApp Access Token",
    WHATSAPP_ACCESS_TOKEN,
  )
  .action(async (mediaID, options) => {
    const result = await sdk.media.getURL({
      mediaID,
      phoneNumberID: options.phoneNumberId,
    });
    console.log(await result.json());
  });

mediaCommand
  .command("upload")
  .description("Upload Media")
  .option("--filename <FILENAME>", "Filename")
  .requiredOption("--mime-type <MIME_TYPE>", "MIME Type")
  .requiredOption(
    "--phone-number-id <PHONE_NUMBER_ID>",
    "From Phone Number ID",
    WHATSAPP_PHONE_NUMBER_ID,
  )
  .requiredOption(
    "--access-token <ACCESS_TOKEN>",
    "WhatsApp Access Token",
    WHATSAPP_ACCESS_TOKEN,
  )
  .action(async (options) => {
    const stdinBuffer = await getStdin.buffer();
    const stdinBlob = new Blob([stdinBuffer], { type: options.mimeType });
    const result = await sdk.media.upload({
      file: stdinBlob,
      phoneNumberID: options.phoneNumberId,
      mimeType: options.mimeType,
      filename: options.filename,
    });
    console.log(await result.json());
  });

const messageCommand = program.command("message").description("Message");

messageCommand
  .command("text")
  .description("Send a Text message")
  .argument("<RECIPIENT>", "Message recipient Phone Number or Phone Number ID")
  .requiredOption("--body <BODY>", "Message body")
  .option("--preview-url", "Enable URL previewing for the message")
  .action(async (recipient, options) => {
    const result = await sdk.message.createMessage({
      to: recipient,
      phoneNumberID: options.phoneNumberId,
      type: MessageType.Text,
      [MessageType.Text]: {
        body: options.body,
        preview_url: options.previewUrl,
      },
    });
    console.log(await result.json());
  });

program.parseAsync();
