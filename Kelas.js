require('./logger.js')()
const cron = require('node-cron')

require('dotenv').config()
const discordBot = require('./bot.js')
const channelID = process.env.channelID

const days  = [
    'Minggu',//0
    'Senin',//1
    'Selasa',//2
    'Rabu',//3
    'Kamis',//4
    'Jumat',//5
    'Sabtu'//6
  ]

module.exports = class Kelas {
    constructor(role, hari, jam, nama) {
        this.nama = nama
        this.role = role
        this.hari = hari
        this.jam = jam
        this._cronStr = []

        // run every 10th minute
        var getCronSched = function (jam) {
            // dummy date, we'll only use the hour and minute
            let jsonDate = '2013-11-09T' + jam + ":00"
            let date = new Date(Date.parse(jsonDate))
            let start = new Date(date.getTime() - 30 * 60000)
            let end = new Date(date.getTime() - 1 * 60000)
            
            return [start, end]
        }
        
        var hour = getCronSched(this.jam)

        let m = parseInt(jam.split(':')[1], 10)
        m = (m <= 0) ? 60 : m
        
        //handle if <30 min
        if (m - 30 < 0) {
            this._cronStr.push(hour[0].getMinutes().toString().padStart(2, '0') + '-59/10 ' + hour[0].getHours().toString().padStart(2, '0') + ' ' + '* * ' + this.hari)
            this._cronStr.push('00-' + hour[1].getMinutes().toString().padStart(2, '0') + '/10 ' + hour[1].getHours().toString().padStart(2, '0') + ' ' + '* * ' + this.hari)
        } else {
            this._cronStr.push(hour[0].getMinutes().toString().padStart(2, '0') + '-' + hour[1].getMinutes().toString().padStart(2, '0') + '/10 ' + hour[0].getHours().toString().padStart(2, '0') + ' ' + '* * ' + this.hari)
        }
    }
    get cronStr() {
        return this._cronStr
    }
    lihatInfoKelas() {
        return `Kelas ${this.nama} di hari ${days[this.hari]} jam ${this.jam}`
    }
    scheduleCronJobs() {
        try {
            var self = this
            this._cronStr.forEach(el => {
                cron.schedule(el, function () {
                    let date = new Date()
                    let minutesRemaining = parseInt(self.jam.split(':')[1], 10) - date.getMinutes()

                    console.log(`Notif kelas ${self.nama} dikirim`)

                    discordBot.bot.channels.get(channelID).send(`REMINDER: ${minutesRemaining} menit lagi kelas <@&${self.role}>`)
                }, {
                    scheduled: true,
                    timezone: 'Asia/Jakarta'
                })
                console.log(`Created cron schedule for ${this.nama}`)
            })
        } catch (error) {
            console.log(error)
        }
    }
}