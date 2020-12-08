const Tugas = require('./Tugas.js')


async function assignTugas(client){
    global.gbTugas = []
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