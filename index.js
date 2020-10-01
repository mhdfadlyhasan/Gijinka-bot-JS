require('./utilities/logger.js')()
const { assignKelas } = require('./utilities/initClasses')
const discordBot = require('./utilities/bot')
const botCommands = require('./commands')

discordBot.bot.on('ready', () => {
  console.log(`Logged in as ${discordBot.bot.user.tag}!`)
  assignKelas(discordBot.bot)
})

//get that sweet commands
Object.keys(botCommands).map(key => {
  //set the commands to collection of commands
  try {
    discordBot.bot.commands.set(botCommands[key].name, botCommands[key]);
    console.log(`Command '${key}' loaded`);
  } catch (error) {
    console.log(error)
  }
});

discordBot.bot.on('message', msg => {

  //is string start with '>'
  if (!msg.content.startsWith('>')) return;
  //splitting > and get string after >
  var args = msg.content.split('>');

  //getting array of text that splitted by space, 
  args = args[1].toLowerCase().split(' ');
  const command = args[0];
  //check commands collection for inputed commands
  if (!discordBot.bot.commands.has(command)) return;
  //execute commands
  try {
    discordBot.bot.commands.get(command).execute(msg, args, discordBot.bot);
    console.log(`Command ${command} executed`)
  }
  catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
})