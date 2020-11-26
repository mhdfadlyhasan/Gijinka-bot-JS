const { Client } = require('pg')
require('dotenv').config()

// use these to connect to heroku postgres db on local (might change, contact me if it did)
var connectionString = 'postgres://ggjyddlnmfepns:37c2a5762e38648e7ce0eafacce3162f8c2b09139a8468b62babe0722d02ca9c@ec2-107-21-201-57.compute-1.amazonaws.com:5432/dkfsc40oli0ag'

// var connectionString = process.env.DATABASE_URL

const client = new Client({
    //   connectionString: process.env.DATABASE_URL,
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

async function setKelas(roleid, hari, jam, matkul){
    const res = await client.query('INSERT INTO kelas VALUES ($1, $2, $3, $4) ON CONFLICT (roleid) DO UPDATE SET roleid = Excluded.roleid, hari = Excluded.hari, jam = Excluded.jam, matkul = Excluded.matkul;', 
        [roleid, hari, jam, matkul], function (err, result) {
            if (err) {
                console.log(err)
                throw err
            }
            return result
    })
    return res
}
async function getJadwal(){
    const res = await client.query('SELECT * FROM kelas').then(result => {
        return result.rows
    }).catch(e => console.error(e.stack))
    return res
}

async function getKelas(roleid){
    const res = await client.query('SELECT * FROM kelas WHERE roleid = $1', [roleid], function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        return result.rows
    })
    return res
}

module.exports = {
    setKelas, getJadwal, getKelas
}
