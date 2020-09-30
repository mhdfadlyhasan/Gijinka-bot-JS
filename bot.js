// module for discord bot
// include it if you want to send message through your bot

const Discord = require('discord.js')
const bot = new Discord.Client()
//create commands collections, this will contain all the commands gawr, euy, chink etc
bot.commands = new Discord.Collection()
const TOKEN = process.env.TOKEN
const channelID = process.env.channelID

bot.channelID = channelID
bot.login(TOKEN)

exports.bot = bot