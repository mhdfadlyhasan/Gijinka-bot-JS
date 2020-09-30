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
    execute(msg, args) {
        var list = []
        var toSend = {
            embed: {
                color: 3447003,
                title: "**Daftar Kelas**",
                fields: []
            }
        }
        classes.forEach(element => {
            list.push(element.lihatInfoKelas())
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
                    value: `${i}. **${el.nama}** jam \`${el.date.getHours(tz).toString().padStart(2, '0')}:${el.date.getMinutes(tz).toString().padStart(2, '0')}\``
                })
            } else {
                i += 1
                toSend.embed.fields[total].value += `\n${i}. **${el.nama}** jam \`${el.date.getHours(tz).toString().padStart(2, '0')}:${el.date.getMinutes(tz).toString().padStart(2, '0')}\``
            }
        })

        msg.channel.send(toSend);
    }
}