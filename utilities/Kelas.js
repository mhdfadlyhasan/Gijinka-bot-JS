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
        this._role = role
        this.hari = hari
        this.jam = jam
        this._cronStr = []
        this.cronJobs = []

        this.scheduleCronJobs()
    }
    get role() {
        return this._role
    }
    get scheduled() {
        return this._scheduled
    }
    get cronStr() {
        return this._cronStr
    }
    getCronSched(){
        // run every 10th minute
        var getRange = function (jam) {
            // dummy date, we'll only use the hour and minute
            let jsonDate = '2013-11-09T' + jam + ':00'
            let date = new Date(Date.parse(jsonDate))
            let start = new Date(date.getTime() - 30 * 60000)
            let end = new Date(date.getTime() - 1 * 60000)

            return [start, end]
        }
        // console.log(this.jam)
        var hour = getRange(this.jam)

        let m = parseInt(this.jam.split(':')[1], 10)
        m = (m <= 0) ? 60 : m

        //handle if <30 min
        if (m - 30 < 0) {
            var upperLimit = (59 - parseInt(hour[0].getMinutes().toString(), 10) >= 10) ? '-59/10 ' : ' '
            this._cronStr.push(hour[0].getMinutes().toString().padStart(2, '0') + upperLimit + hour[0].getHours().toString().padStart(2, '0') + ' ' + '* * ' + this.hari)
            this._cronStr.push('0' + hour[0].getMinutes().toString()[1] + '-' + hour[1].getMinutes().toString().padStart(2, '0') + '/10 ' + hour[1].getHours().toString().padStart(2, '0') + ' ' + '* * ' + this.hari)
        } else {
            this._cronStr.push(hour[0].getMinutes().toString().padStart(2, '0') + '-' + hour[1].getMinutes().toString().padStart(2, '0') + '/10 ' + hour[0].getHours().toString().padStart(2, '0') + ' ' + '* * ' + this.hari)
        }

        // push for M-0
        this._cronStr.push(this.jam.split(':')[1] + ' ' + this.jam.split(':')[0] + ' ' + '* * ' + this.hari)

        console.log(this._cronStr)
    }
    setJadwalKelas(role, hari, jam, nama){
        this.nama = nama
        this._role = role
        this.hari = hari
        this.jam = jam
    }
    stopCronJobs(){
        if(this.cronJobs.length > 0) {
            try {
                this.cronJobs.forEach(el => {
                    el.stop()
                })
                console.log(`Cron Jobs for ${this.nama} has been succesfully stopped`)
                this._cronStr = []
                this.cronJobs = []
                this._scheduled = false
            } catch (error) {
                console.log(error)
            }
        }
    }
    scheduleCronJobs() {        
        this.getCronSched()
        try {
            var self = this
            var count = 0
            this._cronStr.forEach(el => {
                this.cronJobs[count] = cron.schedule(el, function () {
                    function getMinutesRemaining(hStr) {
                        let jam = hStr + ':00'
                        let jsonDate = '2013-11-09T'

                        let now = new Date()
                        let end = new Date(Date.parse(jsonDate + jam))

                        console.log([now, end])

                        let diff = end - new Date(Date.parse(jsonDate + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':00'))
                        return Math.floor((diff / 1000) / 60)
                    }
                    let minutesRemaining = getMinutesRemaining(self.jam)

                    const mulai = self.client.emojis.find(emoji => emoji.name === 'mulai')
                    var str = (minutesRemaining > 0) ? `REMINDER: ${minutesRemaining} menit lagi kelas <@&${self.role}>` : `KELAS <@&${self.role}> di${mulai}`

                    self.client.channels.get(self.client.channelID).send(str)
                    console.log(`Notif kelas ${self.nama} dikirim`)
                }, {
                    scheduled: true,
                    timezone: 'Asia/Jakarta'
                })
                count += 1
                console.log(`Created cron schedule for ${this.nama}`)
            })
            this._scheduled = true
        } catch (error) {
            console.log(error)
        }
    }
}