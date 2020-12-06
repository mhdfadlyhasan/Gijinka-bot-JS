const Tugas = require('../../utilities/Tugas.js')
const lo = require('lodash')

module.exports = {
    name: 'addtugas',
    description: 'Tambah tugas dan deadlinenya',
    usage: 'addtugas [nama kelas] [tanggal deadline] [jam] [Deskripsi tugas]',
    //extract hari dari tanggal deadline
    //insert into [nama kelas] [hari] [tanggal deadline] [jam] [Deskripsi tugas]
    async execute(msg, args) {
        var [_, role, tanggal, jam, ...deskripsi] = args    
        
        //masih error res belum bisa mendapatkan berhasil/gagal
        // if(res){
            // role, hari, jam, deskripsi,tanggal
            
            var role = role.replace(/[^a-zA-Z0-9 ]/g, "");
            console.log(role)
            const res = await msg.client.addTugas(role, tanggal, jam, deskripsi.join(' '))
            
            //client, role, hari, jam, deskripsi,tanggal
            // var roleid = await msg.client.getRoleId(role)
            gbTugas.push(new Tugas(msg.client, role, jam,deskripsi.join(' '), tanggal))
            //client, role, hari, jam, deskripsi,tanggal
            msg.reply(`Tugas berhasil ditambahkan.`)
        // }
        // else msg.reply("Error ketika menambahkan tugas")
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