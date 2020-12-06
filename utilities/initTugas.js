const Tugas = require('./Tugas.js')

global.gbTugas = []

async function assignTugas(client){
    var listTugas = await client.getTugas()

    listTugas.forEach(element => {
        gbTugas.push(new Tugas(
            client, element.roleid, element.deadline_jam,element.deskripsi, element.tanggal
            ))
    })
}

module.exports = {
    assignTugas
}