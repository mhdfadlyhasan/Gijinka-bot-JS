const cron = require('node-cron')
//[role] [hari] [tanggal deadline] [jam] [Deskripsi tugas]
module.exports = class Tugas {
    constructor(client, role, jam, deskripsi,tanggal) {
        this.client = client
        this._role = role
        this.jam = jam
        this.tanggal = new Date(Date.parse(tanggal))
        this._deskripsi = deskripsi
        this._cronStr = []
        this.cronJobs = []
        this.scheduleCronJobs()
    }
    get role() {
        return this._role
    }
    get deskripsi() {
        return this._deskripsi
    }
    
    set deskripsi(deskripsi) {
        this._=deskripsi
    }
    get cronStr() {
        return this._cronStr
    }
    
    getDaysRemaining(){
        var date = new Date()
        return this.tanggal.getDate()-date.getDate()
    }
    getCronSched(){
        // console.log(this.jam)
        var jam = this.jam.split(':')
        this._cronStr.push(`${parseInt(jam[1])} ${parseInt(jam[0])} * * *`)
    }
    scheduleCronJobs() {        
        this.getCronSched()
        try {
            var self = this
            var count = 0
            this._cronStr.forEach(el => {
                this.cronJobs[count] = cron.schedule(el, function () {
                    var daysRemaining = self.getDaysRemaining()
                    var str = (daysRemaining > 0) ? 
                        `REMINDER: ${daysRemaining} hari lagi Tugas <@&${self.role}> deadline Jam:${self.jam}` : 
                        `Tugas <@&${self.role}> deadline hari ini Jam:${self.jam}`

                    self.client.channels.get(self.client.channelID).send(str)
                    console.log(`Notif Tugas dikirim`)
                }, {
                    scheduled: true,
                    timezone: 'Asia/Jakarta'
                })
                count += 1
            })
        } catch (error) {
            console.log(error)
        }
    }
}