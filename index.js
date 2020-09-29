const { assignKelas } = require('./classFunc.js')
const discordBot = require('./bot.js')

const days  = [
  'Minggu',//0
  'Senin',//1
  'Selasa',//2
  'Rabu',//3
  'Kamis',//4
  'Jumat',//5
  'Sabtu'//6
]

discordBot.bot.on('ready', () => {
  console.info(`Logged in as ${discordBot.bot.user.tag}!`)
  assignKelas()
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
  })
