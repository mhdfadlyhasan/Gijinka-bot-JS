const { assignKelas, tambahKelas, listJadwal } = require('./classFunc.js')
const discordBot = require('./bot.js')
const channelID = process.env.channelID

discordBot.bot.on('ready', () => {
  console.log(`Logged in as ${discordBot.bot.user.tag}!`)
  assignKelas()
  // tambahKelas('0000000', 1, '12:55', 'TEST')
  // console.info(listJadwal())
})

discordBot.bot.on('message', msg => {
  if (msg.content === 'time') {
    const time = new Date();
    msg.reply("sekarang jam " + time.getHours( {
      timeZone: 'Asia/Jakarta'
    })+" Menit ke " + time.getMinutes( {
      timeZone: 'Asia/Jakarta'
    })+" Hari " + days[time.getDay( {
      timeZone: 'Asia/Jakarta'
    })]);
  } 
  else if (msg.content === 'gawr') {
    msg.channel.send(
      {
        file: "https://i.kym-cdn.com/photos/images/newsfeed/001/897/645/8a2.jpg",
      }
      );
    }
  else if (msg.content === 'chinked') {
    msg.channel.send('get chinked\nhttps://www.youtube.com/watch?v=kw9Z9ZSEHQQ',
      {
        file: 'https://media1.tenor.com/images/f3980d29ff8d2825735e618968d2edc6/tenor.gif'
      }
    )
  }
  })
