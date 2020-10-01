const days  = [
    'Minggu',//0
    'Senin',//1
    'Selasa',//2
    'Rabu',//3
    'Kamis',//4
    'Jumat',//5
    'Sabtu'//6
  ]

module.exports = {
    name: 'time',
    execute(msg,args,classes){
        const time = new Date();
        msg.reply("sekarang jam " + time.getHours( {
            timeZone: 'Asia/Jakarta'
        }).toString().padStart(2, '0')+"." + time.getMinutes( {
            timeZone: 'Asia/Jakarta'
        }).toString().padStart(2, '0')+" Hari " + days[time.getDay( {
            timeZone: 'Asia/Jakarta'
        })]);
    }
}