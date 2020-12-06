module.exports = {
    name: 'detailtugas',
    description: 'detail tugas, pakai lstugas untuk mendapatkan index',
    usage: 'detailtugas [index]',
    async execute(msg,args){
        [_,index] = args
        try {
            if(index<=0){
                throw "Too Small"
            }else if(index>gbTugas.length){
                throw "Too Big"
            }
            var tugas = gbTugas[index-1]
            var namakelas = classes.find(kelas=>kelas.role==gbTugas[index-1].role)
            var date = `${tugas.tanggal.getDate().toString().padStart(2, '0')}-${(tugas.tanggal.getMonth()+1).toString().padStart(2, '0')}-${tugas.tanggal.getFullYear().toString().padStart(2, '0')}`
            var toSend = `${namakelas.nama} : ${tugas.deskripsi}, Deadline Jam ${tugas.jam} tanggal: ${date}`
            msg.reply(toSend);
        } catch (error) {
            msg.reply("error: Index is " + error);
        }
    }
};
