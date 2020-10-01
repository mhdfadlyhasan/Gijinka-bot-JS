const Kelas = require('./Kelas.js')

global.classes = []

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
}

module.exports = {
    assignKelas
}