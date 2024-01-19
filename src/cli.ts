#!/usr/bin/env node

/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import { CloudAPI } from "./index.js";
import { program } from "commander";
import getStdin from "get-stdin";
import { oraPromise, type Options as OraOptions } from "ora";

const oraOptions: OraOptions = {
  spinner: "simpleDotsScrolling",
};
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const sdk = new CloudAPI();
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
  .action(async (mediaURL, options) => {
    const result = await oraPromise(
      async () => {
        const request = sdk
          .media({ businessID: options.phoneNumberId })
          .download(mediaURL);
        console.log(request.headers);
        return await request.send({
          headers: {
            // Authorization: `Bearer ${options.accessToken}`,
          },
        });
      },
      { ...oraOptions, text: "Downloading media" },
    );

    const arrayBuffer = await result.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    process.stdout.write(buffer);
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
    const result = await oraPromise(
      async () => {
        return await sdk
          .media({ businessID: options.phoneNumberId })
          .delete(mediaID, { phoneNumberID: options.phoneNumberId })
          .send({
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          });
      },
      { ...oraOptions, text: "Deleting media" },
    );

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
    const result = await oraPromise(
      async () => {
        return await sdk
          .media({ businessID: options.phoneNumberId })
          .getURL(mediaID, { phoneNumberID: options.phoneNumberId })
          .send({
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          });
      },
      { ...oraOptions, text: "Getting media URL" },
    );

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
    const result = await oraPromise(
      async () => {
        const stdinBuffer = await getStdin.buffer();
        const stdinBlob = new Blob([stdinBuffer], { type: options.mimeType });

        return await sdk
          .media({ businessID: options.phoneNumberId })
          .upload(stdinBlob, {
            mimeType: options.mimeType,
            filename: options.filename,
          })
          .send({
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          });
      },
      { ...oraOptions, text: "Uploading media" },
    );

    console.log(await result.json());
  });

const messageCommand = program.command("message").description("Message");
const messageSendCommand = messageCommand.command("send");

messageSendCommand
  .command("text")
  .description("Send a text message")
  .argument("<TO_NUMBER>", "To Number")
  .requiredOption(
    "--phone-number-id <PHONE_NUMBER_ID>",
    "From Phone Number ID",
    WHATSAPP_PHONE_NUMBER_ID,
  )
  .requiredOption("--body <MESSAGE_TEXT_BODY>", "Message Body")
  .requiredOption(
    "--access-token <ACCESS_TOKEN>",
    "WhatsApp Access Token",
    WHATSAPP_ACCESS_TOKEN,
  )
  .action(async (toNumber, options) => {
    const result = await oraPromise(
      async () => {
        return await sdk
          .message({ businessID: options.phoneNumberId })
          .text({ body: options.body }, { toNumber })
          .send({
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          });
      },
      { ...oraOptions, text: "Sending text message" },
    );

    console.log(await result.json());
  });

program.parseAsync();
