const Sauce = require('saucenao')
const _ = require('lodash')
let sauce = new Sauce(process.env.API_KEY_SAUCENAO)
module.exports = {
    name: 'saucenao',
    description: 'saucenao',
    usage: 'saucenao ',
    async execute(msg, args) {
        var link = args[1]
        let saus = (await sauce(link)).json
        var hasil = ""
        _.forEach(saus.results, function(element) {
            if(parseFloat(element.header.similarity) > 70.0){
                let link = element.data.ext_urls[0]
                hasil += link + ` similarity ${element.header.similarity} | `
            }
        })
        msg.reply(hasil);
    }
}