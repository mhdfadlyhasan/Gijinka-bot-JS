require('dotenv').config()
const discordBot = require('./bot.js')
const cron = require('node-cron')
const channelID = process.env.channelID

module.exports = class Kelas {
    constructor(role, hari, jam, nama) {
        this.nama = nama
        this.role = role
        this.hari = hari
        this.jam = jam
        this._cronStr = []

        let m = parseInt(jam.split(':')[1], 10)
        m = (m <= 0) ? 60 : m


        // run At every 10th minute
        var getCronSched = function (jam) {
            let jsonDate = '2013-11-09T' + jam + ":00"
            let date = new Date(Date.parse(jsonDate))
            let start = new Date(date.getTime() - 30 * 60000)
            let end = new Date(date.getTime() - 1 * 60000)
            return [start, end]
        }

        var hour = getCronSched(this.jam)
        console.log(hour)

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
        return `Kelas ${this.name} di jam ${this.jam}`
    }
    sendMessage() {
        let date = new Date()
        let minutesRemaining = parseInt(this.jam.split('.')[0]) - date.getMinutes()

        console.info(`notif kelas ${this.nama} dikirim\nLogged on: `)
        console.info(date.getHours() + '.' + date.getMinutes())

        discordBot.bot.channels.get(channelID).send(`REMINDER: ${minutesRemaining} menit lagi kelas <@&${this.role}>`)
    }
    scheduleCronJobs() {
        try {
            this._cronStr.forEach(el => {
                cron.schedule(el, this.sendMessage, {
                    scheduled: true,
                    timezone: 'Asia/Jakarta'
                })
                console.info(`Created cron schedule for ${this.nama}`)
            })
        } catch (error) {
            console.info(error)
        }
    }
}