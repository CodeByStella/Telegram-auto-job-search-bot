import { TelegramClient } from "telegram";
import { checkKeywords } from "./checkKeyword";

export const eventHandler = (client: TelegramClient) => async (event) => {
  try {
    const message = event?.message?.message?.toLowerCase() || "";
    const chatId = event?.message?.chatId?.value;
    const messageId = event?.message?.id;

    console.log(
      "New message received:",
      message.slice(0, 10),
      chatId,
      messageId
    );

    const isExist = await checkKeywords(message);

    if (
      !(
        message &&
        message.length < 500 &&
        message.length > 5 &&
        chatId &&
        messageId &&
        isExist
      )
    )
      return;

    const chat = await client.getEntity(chatId);
    const username = (chat as any)?.username;
    console.log(username);
    const messageLink = username
      ? `https://t.me/${username}/${messageId}`
      : `https://t.me/c/${Math.abs(chatId).toString().slice(4)}/${messageId}`;

    console.log("Message link:", messageLink);

    try {
      await client.sendMessage("StellaRay777", {
        message: messageLink,
      });
    } catch (error) {
      console.log("Error sending DM me message:", error);
    }
  } catch (error) {
    console.log(error);
  }
};
