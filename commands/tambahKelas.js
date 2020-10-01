const Kelas = require('../utilities/Kelas.js')

module.exports = {
    name: 'tambahkelas',
    execute(msg, args, client) {
        if (msg.member.roles.has(client.adminRoleID)) {
            var roleID, hari, jam, matkul
            [_, roleID, hari, jam, matkul] = args

            let isDateValid = function (arr) {
                let hari = arr[0]
                let jam = arr[1]
                let jsonDate = '2020-06-' + hari.toString().padStart(2, '0') + 'T' + jam + ':00'
                let date = new Date(Date.parse(jsonDate))

                return date instanceof Date && !isNaN(date)
            }
            if (isDateValid([hari, jam])) {
                classes.push(new Kelas(client, roleID, hari, jam, matkul))
                msg.reply(`kelas \`${matkul}\` berhasil ditambahkan.`)
            } else {
                throw new Error('InvalidDate')
            }
        } else {
            msg.reply('`you lack permission to do this operation.`')
        }
    }
}