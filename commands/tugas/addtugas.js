const Kelas = require('../../utilities/Kelas.js')
const lo = require('lodash')

module.exports = {
    name: 'addtugas',
    description: 'Tambah tugas dan deadlinenya',
    usage: 'addtugas [nama kelas] [tanggal deadline] [jam] [Deskripsi tugas]',
    //extract hari dari tanggal deadline
    //insert into [nama kelas] [hari] [tanggal deadline] [jam] [Deskripsi tugas]
    async execute(msg, args) {
        var [_, nama_kelas, tanggal, jam, ...deskripsi] = args    
        const res = await msg.client.addTugas(nama_kelas, tanggal, jam, deskripsi.join(' '))
        //masih error res belum bisa mendapatkan berhasil/gagal
        if(res){
            msg.reply(`kelas \`${nama_kelas}\` berhasil ditambahkan.`)
            const mk = await msg.client.getTugas()
            
                // if(typeof mk !== 'undefined' && mk !== null && mk.length > 0) {
                //     try {
                //         let idx = lo.findIndex(tugas, function(o) { 
                //             return o.role === roleID; 
                //         })

                //         // update jadwal and restart the cronjobs
                //         // console.log(tugas[idx].cronStr)
                //         tugas[idx].setJadwalKelas(roleID, hari, jam, matkul.join(' '))
                //         tugas[idx].stopCronJobs()
                //         tugas[idx].scheduleCronJobs()
                //         // console.log(tugas[idx].cronStr)
                //     } catch (error) {
                //         console.log(error)
                //     }
                // } else {
                //     classes.push(new Kelas(msg.client, roleID, hari, jam, matkul.join(' ')))
                //     msg.reply(`kelas \`${matkul.join(' ')}\` berhasil ditambahkan.`)
                // }
                // const res = await msg.client.setKelas(roleID, hari, jam, matkul.join(' '))
        }
        else msg.reply("Error ketika menambahkan tugas")
        // if (msg.member.roles.has(msg.client.adminRoleID)) {
        //     let isDateValid = function (arr) {
        //         let hari = arr[0]
        //         let jam = arr[1]
        //         let jsonDate = '2020-06-' + hari.toString().padStart(2, '0') + 'T' + jam + ':00'
        //         let date = new Date(Date.parse(jsonDate))
        //         return date instanceof Date && !isNaN(date)
        //     }
            
        // } else {
        //     msg.reply('`you lack permission to do this operation.`')
        // }
    }
}