const Kelas = require('./Kelas.js')

classes = []

function assignKelas(client){
    //senin
    classes.push(new Kelas(client, '759774771847757834', 1, '07:00', 'Jaringan Nirkabel'))//jarnil
    classes.push(new Kelas(client, '759774530444591126', 1, '10:00', 'Realita Virtual dan Augmentasi'))//rva
    classes.push(new Kelas(client, '759774622534336562', 1, '10:00', 'Pemrograman Perangkat Bergerak'))//PPB
    classes.push(new Kelas(client, '759774588140912661', 1, '13:00', 'Teknopreneurship'))//teknopreneur
    
    //selasa
    classes.push(new Kelas(client, '760318003543408690', 2, '10:00', 'Evolusi Perangkat Lunak'))//EPL
    classes.push(new Kelas(client, '760318042566688798', 2, '13:00', 'Komputasi Bergerak'))//Komber
    classes.push(new Kelas(client, '760318072719933481', 2, '13:00', 'Sistem Temu Kembali Informasi'))//STKI
    classes.push(new Kelas(client, '760318108849930280', 2, '16:00', 'Visi Komputer'))//Viskom


    //Rabu
    classes.push(new Kelas(client, '760777448039645185', 3, '07:00', 'Biomedik'))//Biomedik
    classes.push(new Kelas(client, '760776180236025856', 3, '10:00', 'Robotika'))//Robotika
    classes.push(new Kelas(client, '760778052916609045', 3, '13:00', 'Teknologi Antar Jaringan'))//TAJ
    classes.push(new Kelas(client, '760778085909528616', 3, '13:00', 'Sistem Enterprise'))//SE
    classes.push(new Kelas(client, '760776302252392460', 3, '16:00', 'Teknik Pengembangan Game'))//TPG
    classes.push(new Kelas(client, '760779088146464820', 3, '16:00', 'Sistem Informasi Geografis'))//SIG

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