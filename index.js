require('./utilities/logger.js')()
const { assignKelas } = require('./utilities/initClasses')
const discordBot = require('./utilities/bot')
const botCommands = require('./commands')
const SQLite = require("better-sqlite3")
const sql = new SQLite('./db/bot.sqlite')

discordBot.bot.on('ready', () => {

  console.log(`Logged in as ${discordBot.bot.user.tag}!`)

  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'kelas';").get()
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE kelas (roleID TEXT PRIMARY KEY, hari INTEGER, jam TEXT, matkul TEXT);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_role ON kelas (roleID);").run()
    sql.pragma("synchronous = 1")
    sql.pragma("journal_mode = wal")
  }

  discordBot.bot.getJadwal = sql.prepare("SELECT * FROM kelas;")
  discordBot.bot.getKelas = sql.prepare("SELECT * FROM kelas WHERE roleID = ?;")
  discordBot.bot.setKelas = sql.prepare("INSERT OR REPLACE INTO kelas (roleID, hari, jam, matkul) VALUES (@roleID, @hari, @jam, @matkul);")

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

  const command = args[0].replace('>','')
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