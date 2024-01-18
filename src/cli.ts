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
import { setTimeout } from "node:timers/promises";
import { oraPromise, type Options as OraOptions } from "ora";

const oraOptions: OraOptions = {
  spinner: "simpleDotsScrolling",
};
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const sdk = new CloudAPI();
program.name("whatsapp").description("WhatsApp SDK CLI");

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
