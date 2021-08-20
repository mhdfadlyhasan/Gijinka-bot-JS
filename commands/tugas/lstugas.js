const _ = require('lodash')

module.exports = {
    name: 'lstugas',
    description: 'list tugas kalian, kerjain woi!',
    usage: 'lstugas',
    async execute(msg,args){

        var gbTugas = await msg.client.getTugas()
        var toSend = ""
        var i = 1
        _.forEach(gbTugas, function(element) {
            
            var date = `${element.tanggal.getDate().toString().padStart(2, '0')}-${(element.tanggal.getMonth()+1).toString().padStart(2, '0')}-${element.tanggal.getFullYear().toString().padStart(2, '0')}`
            toSend=`${i}.${element.roleid} Jam ${element.deadline_jam} tanggal: ${date}\n`
            i+=1
        })
        
        // _.forEach(list, function(element) {
        //     let jsonDate = '2020-06-' + element.hari.toString().padStart(2, '0') + 'T' + element.jam + ':00'
        //     let date = new Date(Date.parse(jsonDate))
        //     element.date = date
        // })

        // list = _.sortBy(list, function (dateObj) {
        //     return new Date(dateObj.date)
        // })

        // var day = 0
        // var total = -1
        // const tz = { timeZone: 'Asia/Jakarta' }
        // _.forEach(list, function(el) {
        //     var d = el.date.getDay(tz)
        //     if (d > day) {
        //         day = d
        //         i = 1
        //         total += 1
        //         toSend.embed.fields.push({
        //             name: days[d],
        //             value: `${i}. **${el.matkul}** jam \`${el.date.getHours(tz).toString().padStart(2, '0')}:${el.date.getMinutes(tz).toString().padStart(2, '0')}\``
        //         })
        //     } else {
        //         i += 1
        //         toSend.embed.fields[total].value += `\n${i}. **${el.matkul}** jam \`${el.date.getHours(tz).toString().padStart(2, '0')}:${el.date.getMinutes(tz).toString().padStart(2, '0')}\``
        //     }
        // })
        msg.channel.send(toSend);
    }
};
