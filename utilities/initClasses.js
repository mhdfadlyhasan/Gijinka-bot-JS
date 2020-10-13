const Kelas = require('./Kelas.js')

global.classes = []

function assignKelas(client){
    var listKelas = client.getJadwal.all()

    listKelas.forEach(element => {
        classes.push(new Kelas(client, element.roleID, element.hari, element.jam, element.matkul))
    })
}

module.exports = {
    assignKelas
}