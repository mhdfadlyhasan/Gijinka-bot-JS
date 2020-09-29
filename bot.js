// module for discord bot
// include it if you want to send message through your bot

const Discord = require('discord.js')
const bot = new Discord.Client()
const TOKEN = process.env.TOKEN

bot.login(TOKEN)

exports.bot = bot