const _ = require('lodash')
const days = [
    'Minggu',//0
    'Senin',//1
    'Selasa',//2
    'Rabu',//3
    'Kamis',//4
    'Jumat',//5
    'Sabtu'//6
]
module.exports = {
    name: 'listkelas',
    description: 'List jadwal mata kuliah',
    usage: 'listkelas',
    async execute(msg, args) {
        var list = await msg.client.getJadwal()

        console.log(list)
        var toSend = {
            embed: {
                color: 3447003,
                title: "**Daftar Kelas**",
                fields: []
            }
        }
        
        _.forEach(list, function(element) {
            let jsonDate = '2020-06-' + element.hari.toString().padStart(2, '0') + 'T' + element.jam + ':00'
            let date = new Date(Date.parse(jsonDate))
            element.date = date
        })

        list = _.sortBy(list, function (dateObj) {
            return new Date(dateObj.date)
        })

        var day = 0
        var total = -1
        var i = 0
        const tz = { timeZone: 'Asia/Jakarta' }
        _.forEach(list, function(el) {
            var d = el.date.getDay(tz)
            if (d > day) {
                day = d
                i = 1
                total += 1
                toSend.embed.fields.push({
                    name: days[d],
                    value: `${i}. **${el.matkul}** jam \`${el.date.getHours(tz).toString().padStart(2, '0')}:${el.date.getMinutes(tz).toString().padStart(2, '0')}\``
                })
            } else {
                i += 1
                toSend.embed.fields[total].value += `\n${i}. **${el.matkul}** jam \`${el.date.getHours(tz).toString().padStart(2, '0')}:${el.date.getMinutes(tz).toString().padStart(2, '0')}\``
            }
        })

        msg.channel.send(toSend);
    }
}