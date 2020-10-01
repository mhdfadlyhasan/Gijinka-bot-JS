const cron = require('node-cron')
const days = [
    'Minggu',//0
    'Senin',//1
    'Selasa',//2
    'Rabu',//3
    'Kamis',//4
    'Jumat',//5
    'Sabtu'//6
]

module.exports = class Kelas {
    constructor(client, role, hari, jam, nama) {
        this.client = client
        this.nama = nama
        this.role = role
        this.hari = hari
        this.jam = jam
        this._cronStr = []
        this._scheduled = false

        // run every 10th minute
        var getCronSched = function (jam) {
            // dummy date, we'll only use the hour and minute
            let jsonDate = '2013-11-09T' + jam + ":00"
            let date = new Date(Date.parse(jsonDate))
            let start = new Date(date.getTime() - 30 * 60000)
            let end = new Date(date.getTime() - 1 * 60000)

            return [start, end]
        }
        // console.log(this.jam)
        var hour = getCronSched(this.jam)

        let m = parseInt(this.jam.split(':')[1], 10)
        m = (m <= 0) ? 60 : m

        //handle if <30 min
        if (m - 30 < 0) {
            this._cronStr.push(hour[0].getMinutes().toString().padStart(2, '0') + '-59/10 ' + hour[0].getHours().toString().padStart(2, '0') + ' ' + '* * ' + this.hari)
            this._cronStr.push('00-' + hour[1].getMinutes().toString().padStart(2, '0') + '/10 ' + hour[1].getHours().toString().padStart(2, '0') + ' ' + '* * ' + this.hari)
        } else {
            this._cronStr.push(hour[0].getMinutes().toString().padStart(2, '0') + '-' + hour[1].getMinutes().toString().padStart(2, '0') + '/10 ' + hour[0].getHours().toString().padStart(2, '0') + ' ' + '* * ' + this.hari)
        }

        this.scheduleCronJobs()
    }
    get scheduled() {
        return this._scheduled
    }
    get cronStr() {
        return this._cronStr
    }
    lihatInfoKelas() {
        let jsonDate = '2020-06-' + this.hari.toString().padStart(2, '0') + 'T' + this.jam + ':00'
        let date = new Date(Date.parse(jsonDate))
        return {
            nama: this.nama,
            date: date
        }
    }
    scheduleCronJobs() {
        try {
            var self = this
            this._cronStr.forEach(el => {
                cron.schedule(el, function () {
                    let date = new Date()
                    let menit_kelas = parseInt(self.jam.split(':')[1], 10);
                    let minutesRemaining = (menit_kelas > 0 ? menit_kelas : 60) - date.getMinutes()

                    console.log(`Notif kelas ${self.nama} dikirim`)

                    self.client.channels.get(self.client.channelID).send(`REMINDER: ${minutesRemaining} menit lagi kelas <@&${self.role}>`)
                }, {
                    scheduled: true,
                    timezone: 'Asia/Jakarta'
                })
                console.log(`Created cron schedule for ${this.nama}`)
            })
            this._scheduled = true
        } catch (error) {
            console.log(error)
        }
    }
}