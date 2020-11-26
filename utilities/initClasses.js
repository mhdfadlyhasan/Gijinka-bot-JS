const Kelas = require('./Kelas.js')

global.classes = []

async function assignKelas(client){
    var listKelas = await client.getJadwal()

    listKelas.forEach(element => {
        classes.push(new Kelas(client, element.roleid, element.hari, element.jam, element.matkul))
    })
}

module.exports = {
    assignKelas
}