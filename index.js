require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const cron = require('node-cron');


bot.login(TOKEN);
const days  = [
  'Minggu',//0
  'Senin',//1
  'Selasa',//2
  'Rabu',//3
  'Kamis',//4
  'Jumat',//5
  'Sabtu'//6
]

class Kelas{
  constructor(role,hari,jam){
    this.role = role
    this.hari = hari
    this.jam = jam
  }
}

jadwal_kelas = []
assignKelas()

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  cron.schedule('50 6-17 * * *', function() {
    checkKelas()
  });
});

bot.on('message', msg => {
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
});

function assignKelas(){
  //senin
  jadwal_kelas.push(new Kelas('759774771847757834',1,'6.50'))//jarnil
  jadwal_kelas.push(new Kelas('759774530444591126',1,'9.50'))//rva
  jadwal_kelas.push(new Kelas('759774622534336562',1,'9.50'))//PPB
  jadwal_kelas.push(new Kelas('759774588140912661',1,'12.50'))//teknopreneur

  //selasa
  jadwal_kelas.push(new Kelas('760318003543408690',2,'9.50'))//EPL
  jadwal_kelas.push(new Kelas('760318042566688798',2,'12.50'))//Komber
  jadwal_kelas.push(new Kelas('760318072719933481',2,'12.50'))//STKI
  jadwal_kelas.push(new Kelas('760318108849930280',2,'15.50'))//Viskom
}
function checkKelas()
{
  for (kelas of jadwal_kelas){
    const time = new Date();
    if(kelas.jam == time.getHours()+'.'+time.getMinutes() && 
    time.getDay( {
      timeZone: 'Asia/Jakarta'
    }) == kelas.hari.toString()
    )
    {
      console.info('notif kelas dikirim');
      console.info(time.getHours()+'.'+time.getMinutes())
      bot.channels.get('759778604845891614').send(`10 Menit lagi kelas <@&${kelas.role}>`)
    }
  }
}
