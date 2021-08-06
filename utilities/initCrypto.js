const cron = require('node-cron')
const axios = require("axios")
function startCryptoCron(client) {
    cron.schedule('* * * * *', async function () {
        var str = await axios.get('https://indodax.com/api/price_increments')
        client.channels.get('873052497843978270').send(str.data.increments.btc_idr)
        console.log(`info tiap menit dikirim`)
    }, {
        scheduled: true,
        timezone: 'Asia/Jakarta'
    })    
    console.log('init')
}


module.exports = {
    startCryptoCron
}