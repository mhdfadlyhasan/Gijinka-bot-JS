const Kelas = require('./Kelas.js')

classes = []

function assignKelas(client){
    //senin
    classes.push(new Kelas(client, '759774771847757834', 1, '06:50', 'Jaringan Nirkabel'))//jarnil
    classes.push(new Kelas(client, '759774530444591126', 1, '09:50', 'Realita Virtual dan Augmentasi'))//rva
    classes.push(new Kelas(client, '759774622534336562', 1, '09:50', 'Pemrograman Perangkat Bergerak'))//PPB
    classes.push(new Kelas(client, '759774588140912661', 1, '12:50', 'Teknopreneurship'))//teknopreneur
    
    //selasa
    classes.push(new Kelas(client, '760318003543408690', 2, '09:50', 'Evolusi Perangkat Lunak'))//EPL
    classes.push(new Kelas(client, '760318042566688798', 2, '12:50', 'Komputasi Bergerak'))//Komber
    classes.push(new Kelas(client, '760318072719933481', 2, '12:50', 'Sistem Temu Kembali Informasi'))//STKI
    classes.push(new Kelas(client, '760318108849930280', 2, '15:50', 'Visi Komputer'))//Viskom
    runSchedule()
}

function tambahKelas(client, roleID, hari, jam, matkul) {
    classes.push(new Kelas(client, roleID, hari, jam, matkul))
    classes[classes.length - 1].scheduleCronJobs()
}

function listJadwal() {
    var list = []
    classes.forEach(element => {
        list.push(element.lihatInfoKelas())
    })
    return list
}

const runSchedule = function () {
    classes.forEach(element => {
        element.scheduleCronJobs()
    })
}

module.exports = {
    assignKelas, tambahKelas, listJadwal
}