// module for discord bot
// include it if you want to send message through your bot

require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
//create commands collections, this will contain all the commands gawr, euy, chink etc
bot.commands = new Discord.Collection()
const TOKEN = process.env.TOKEN
const channelID = process.env.channelID
const adminRoleID = process.env.adminRoleID

bot.channelID = channelID
bot.adminRoleID = adminRoleID
bot.login(TOKEN)

exports.bot = bot