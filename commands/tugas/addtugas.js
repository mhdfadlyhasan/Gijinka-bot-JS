const Tugas = require('../../utilities/Tugas.js')
const {assignTugas} = require('../../utilities/initTugas')
const lo = require('lodash')

module.exports = {
    name: 'addtugas',
    description: 'Tambah tugas dan deadlinenya',
    usage: 'addtugas [nama kelas] [tanggal deadline] [jam] [Deskripsi tugas]',
    async execute(msg, args) {
        var [_, role, tanggal, jam, ...deskripsi] = args    
            var role = role.replace(/[^a-zA-Z0-9 ]/g, "");
            const res = await msg.client.addTugas(msg,role, tanggal, jam, deskripsi.join(' '))
    }
}