const { assignKelas, tambahKelas, listJadwal } = require('./classFunc.js')
const discordBot = require('./bot.js')
const botCommands = require('./commands');

discordBot.bot.on('ready', () => {
  console.log(`Logged in as ${discordBot.bot.user.tag}!`)
  assignKelas(discordBot.bot)
  // tambahKelas(discordBot.bot, '0000000', 1, '12:55', 'TEST')
  // console.info(listJadwal())
})

//get that sweet commands
Object.keys(botCommands).map(key => {
  console.log(key + "ini bot");

  //set the commands to collection of commands
  discordBot.bot.commands.set(botCommands[key].name, botCommands[key]);
});

discordBot.bot.on('message', msg => {

  //is string start with '>'
  if(!msg.content.startsWith('>')) return;
  //splitting > and get string after >
  var args = msg.content.split('>');

  //getting array of text that splitted by space, 
  args = args[1].toLowerCase().split(' ');
  const command = args[0];
  //check commands collection for inputed commands
  if (!discordBot.bot.commands.has(command)) return;
  //execute commands
  try {
      discordBot.bot.commands.get(command).execute(msg,args);
    } 
  catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  })