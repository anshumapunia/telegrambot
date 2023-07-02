const fetch = require('isomorphic-fetch');
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const chatId= process.env.chatId;
// console.log(token);
// console.log(chatId)

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual Telegram bot token
// const bot = new TelegramBot(process.env.token);
const bot = new TelegramBot('5993503319:AAE-iHRiAMIYnFy4FuoexfIgekAQo8Kah_s');
// console.log(bot)
async function getRandomWikipediaArticle() {
  try {
    // Fetch a random Wikipedia article
    const response = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json');
    const data = await response.json();
    const pageId = data.query.random[0].id;

    // Fetch the summary of the article
    const summaryResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&pageids=${pageId}`);
    const summaryData = await summaryResponse.json();
    const summary = summaryData.query.pages[pageId].extract;

    // Publish the article to a Telegram group
    // const chatId = 'YOUR_TELEGRAM_GROUP_CHAT_ID';

    // console.log(chatId) // Replace with the actual chat ID of your Telegram group
    bot.sendMessage(chatId, summary);
  } catch (error) {
    console.error('Error:', error);
  }
}


getRandomWikipediaArticle();
