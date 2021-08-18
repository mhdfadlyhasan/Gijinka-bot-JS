const axios = require("axios")
const days  = [
    'Minggu',//0
    'Senin',//1
    'Selasa',//2
    'Rabu',//3
    'Kamis',//4
    'Jumat',//5
    'Sabtu'//6
  ]

module.exports = {
    name: 'judi',
    description: 'judi indodax',
    usage: 'judi',
    execute(msg,args){
        axios.get('https://indodax.com/api/price_increments')
            .then(resp => {
                msg.reply('bitcoin ' + resp.data.increments.btc_idr)
            })
    }
}