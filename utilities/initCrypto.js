const axios = require("axios")
const cron = require('node-cron')
function startCryptoCron(client) {
    // client.channels.get('873052497843978270').send('Harga crypto tiap menit').then((msg) => {
    //    cron.schedule('* * * * *', async function () {
    //         var str = await axios.get('https://indodax.com/api/price_increments')
    //             console.log(`info tiap menit dikirim`)
    //             msg.edit(str.data.increments.btc_idr)
    //     }, {
    //         scheduled: true,
    //         timezone: 'Asia/Jakarta'
    //     })   
    // })
}
module.exports = {
    startCryptoCron
}