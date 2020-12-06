const {client} = require('./connect')
async function addTugas(roleid,tanggal,jam,deskripsi){
    //setkelas [nama kelas] [tanggal deadline] [jam] [Deskripsi tugas]'
    // insert into [nama kelas] [hari] [tanggal deadline] [jam] [Deskripsi tugas]
    const getHari = function (tanggal){
        var date = new Date(Date.parse(tanggal))
        return (date.getDay())
    }
    //throw error masih salah, apabila query salah, addtugas.js ga bisa tahu
        try {
            var res = await client.query('INSERT INTO tugas(roleid,hari,tanggal,deadline_jam,deskripsi)'+
            'VALUES ($1 , $2, $3, $4,$5) ', 
                [roleid,getHari(tanggal),tanggal,jam,deskripsi], function (err, result) {
                    if(result==null){
                        // throw err
                        throw new Error("ada error")
                    }
                }) 
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    // return false
}
async function getTugas(){
    const res = await client.query('SELECT * FROM tugas ').then(result => {
        return result.rows
    }).catch(e => console.error(e.stack))
    return res
}

async function getRoleId(nama_kelas){
    const res = await client.query('select roleid from kelas where kelas.matkul = $1',[nama_kelas]).then(result => {
        return result.rows
    }).catch(e => console.error(e.stack))
    return res
}
module.exports = {
    addTugas,getTugas,getRoleId
}