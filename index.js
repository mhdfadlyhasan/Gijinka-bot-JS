require('./utilities/logger.js')()
const { assignKelas } = require('./utilities/initClasses')
const { setKelas, getJadwal, getKelas } = require('./utilities/connect')
const discordBot = require('./utilities/bot')
const botCommands = require('./commands')

discordBot.bot.on('ready', () => {

  console.log(`Logged in as ${discordBot.bot.user.tag}!`)

  discordBot.bot.getJadwal = getJadwal
  discordBot.bot.getKelas = getKelas
  discordBot.bot.setKelas = setKelas

  assignKelas(discordBot.bot)
})

//get that sweet commands
Object.keys(botCommands).map(key => {
  //set the commands to collection of commands
  try {
    discordBot.bot.commands.set(botCommands[key].name, botCommands[key])
    console.log(`Command '${key}' loaded`)
  } catch (error) {
    console.log(error)
  }
})

discordBot.bot.on('message', msg => {
  //prefix '>'
  if (!msg.content.startsWith(discordBot.bot.prefix)) return
  
  //remove all whitespace
  let args = msg.content.split(/ +/)
  //have to remove '>' from command

  const command = args[0].replace(discordBot.bot.prefix,'')
  // console.info(args)
  
  //check commands collection for inputed commands
  if (!discordBot.bot.commands.has(command)) return
  //execute commands
  try {
    discordBot.bot.commands.get(command).execute(msg, args)
    console.log(`Command ${command} executed`)
  }
  catch (error) {
    console.error(error)
    msg.reply('there was an error trying to execute that command!')
  }
})