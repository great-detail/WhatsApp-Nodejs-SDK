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
// import { exec } from "node:child_process";
import axios from "axios";
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
    // TODO: Use fetch over axios
    const result = await oraPromise(
      () =>
        axios.get(mediaURL, {
          responseType: "stream",
          headers: {
            Authorization: `Bearer ${options.accessToken}`,
          },
        }),
      { ...oraOptions, text: "Downloading media" },
    );

    result.data.pipe(process.stdout);

    /*
    await new Promise((resolve) => {
      exec(
        `curl --location "${mediaURL}" --header "Authorization: Bearer ${options.accessToken}" > file.png`,
        (_error, stdout) => resolve(stdout),
      );
    });

    fetch(mediaURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
      },
    });
    */
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
      () =>
        sdk.media
          .delete(mediaID, { phoneNumberID: options.phoneNumberId })
          .send({
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }),
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
      () =>
        sdk.media
          .getURL(mediaID, { phoneNumberID: options.phoneNumberId })
          .send({
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }),
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
    const stdinBuffer = await getStdin.buffer();
    const stdinBlob = new Blob([stdinBuffer], { type: options.mimeType });

    const result = await oraPromise(
      () =>
        sdk.media
          .upload(stdinBlob, {
            phoneNumberID: options.phoneNumberId,
            mimeType: options.mimeType,
            filename: options.filename,
          })
          .send({
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }),
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
      () =>
        sdk
          .message({ phoneNumberID: options.phoneNumberId })
          .text({ body: options.body }, { toNumber })
          .send({
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }),
      { ...oraOptions, text: "Sending text message" },
    );

    console.log(await result.json());
  });

program.parseAsync();
