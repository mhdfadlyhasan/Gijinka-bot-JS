const Kelas = require('../utilities/Kelas.js')
const lo = require('lodash')

module.exports = {
    name: 'setkelas',
    description: 'Tambah kelas ke jadwal',
    usage: 'setkelas [roleID] [hari] [jam] [nama matkul]',
    async execute(msg, args) {
        if (msg.member.roles.has(msg.client.adminRoleID)) {
            var [_, roleID, hari, jam, ...matkul] = args
            
            let isDateValid = function (arr) {
                let hari = arr[0]
                let jam = arr[1]
                let jsonDate = '2020-06-' + hari.toString().padStart(2, '0') + 'T' + jam + ':00'
                let date = new Date(Date.parse(jsonDate))
                
                return date instanceof Date && !isNaN(date)
            }
            if (isDateValid([hari, jam])) {
                const mk = await msg.client.getKelas()
                if(typeof mk !== 'undefined' && mk !== null && mk.length > 0) {
                    try {
                        let idx = lo.findIndex(classes, function(o) { return o.role === roleID; })

                        // update jadwal and restart the cronjobs
                        // console.log(classes[idx].cronStr)
                        classes[idx].setJadwalKelas(roleID, hari, jam, matkul.join(' '))
                        classes[idx].stopCronJobs()
                        classes[idx].scheduleCronJobs()
                        // console.log(classes[idx].cronStr)
    
                        msg.reply(`kelas \`${matkul.join(' ')}\` berhasil diupdate.`)
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    classes.push(new Kelas(msg.client, roleID, hari, jam, matkul.join(' ')))
                    msg.reply(`kelas \`${matkul.join(' ')}\` berhasil ditambahkan.`)
                }
                const res = await msg.client.setKelas(roleID, hari, jam, matkul.join(' '))
            } else {
                throw new Error('InvalidDate')
            }
        } else {
            msg.reply('`you lack permission to do this operation.`')
        }
    }
}