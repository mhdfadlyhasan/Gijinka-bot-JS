const axios = require("axios")
function startCryptoCron(client) {
    client.channels.get('873052497843978270').send('Harga crypto tiap menit').then((msg) => {
        setTimeout( async () => {
            var str = await axios.get('https://indodax.com/api/price_increments')
            console.log(`info tiap menit dikirim`)
            msg.edit(str.data.increments.btc_idr)
        },60000)
    })
}


module.exports = {
    startCryptoCron
}