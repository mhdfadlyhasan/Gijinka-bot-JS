const Sauce = require('saucenao')
const _ = require('lodash')
module.exports = {
    name: 'saucenao',
    description: 'saucenao',
    usage: 'saucenao ',
    async execute(msg, args) {
        if(msg.attachments.size>0){ //user may send multiple images
            link = msg.attachments.url
            msg.attachments.map(async function(val, key) {
                let link = val.url
                msg.reply(await getSauce(link))
            })
        }
        else {
            var link = args[1]
            msg.reply(await getSauce(link))
        }
    }
}

async function getSauce(link) {
    let sauce = new Sauce(process.env.API_KEY_SAUCENAO)
    let saus = (await sauce(link)).json
    var hasil = ""
    let found = false
    _.forEach(saus.results, function(element) {
        console.log(element.header.similarity)
        if(parseFloat(element.header.similarity) > 30.0){
            found = true
            if(element.data.ext_urls != null) 
            {
                let link = element.data.ext_urls[0]
                hasil += link + `\n similarity ${element.header.similarity} | `    
            }
            
        }
    })
    if(!found) hasil = "not found"
    return hasil
}
