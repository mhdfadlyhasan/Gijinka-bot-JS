const {client} = require('./connect')
const Tugas = require('../../utilities/Tugas.js')
const {assignTugas} = require('../../utilities/initTugas')
async function addTugas(clientsChat, role, tanggal, jam, deskripsi) {
    const getHari = function (tanggal) {
        var date = new Date(Date.parse(tanggal))
        return isNaN(date.getDay()) ? tanggal : date.getDay()
    }
    try {
        var res = await client.query('INSERT INTO tugas(roleid,hari,tanggal,deadline_jam,deskripsi)' +
            'VALUES ($1 , $2, $3, $4,$5) ', [role, getHari(tanggal), tanggal, jam, deskripsi],
            function (err, result) {
                if (result == null) {
                    clientsChat.reply(err)
                } else {
                    gbTugas.push(new Tugas(clientsChat.client, role, jam, deskripsi, tanggal))
                    assignTugas(clientsChat.client)
                    clientsChat.reply('Berhasil')
                }
            })
    } catch (error) {
        console.log(error)
    }
}
async function getTugas() {
    const res = await client.query('SELECT * FROM tugas where tugas.tanggal >= (NOW() - interval \'2 day\')').then(result => {
        return result.rows
    }).catch(e => console.error(e.stack))
    return res
}

async function getRoleId(nama_kelas) {
    const res = await client.query('select roleid from kelas where kelas.matkul = $1', [nama_kelas]).then(result => {
        return result.rows
    }).catch(e => console.error(e.stack))
    return res
}
module.exports = {
    addTugas,
    getTugas,
    getRoleId
}