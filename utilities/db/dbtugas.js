const {client} = require('./connect')
async function setTugas(roleid, hari, jam, matkul){
    const res = await client.query('INSERT INTO tugas VALUES ($1, $2, $3, $4) ON CONFLICT (roleid) DO UPDATE SET roleid = Excluded.roleid, hari = Excluded.hari, jam = Excluded.jam, matkul = Excluded.matkul;', 
        [roleid, hari, jam, matkul], function (err, result) {
            if (err) {
                console.log(err)
                throw err
            }
            return result
    })
    return res
}
async function getTugas(){
    const res = await client.query('SELECT * FROM tugas').then(result => {
        return result.rows
    }).catch(e => console.error(e.stack))
    return res
}

async function getTugas(roleid){
    const res = await client.query('SELECT * FROM tugas WHERE roleid = $1', [roleid], function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        return result.rows
    })
    return res
}


module.exports = {
    setTugas,getTugas
}