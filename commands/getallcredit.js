const _ = require('lodash')

module.exports = {
    name: 'getallcredit',
    description: 'Get social credit value',
    usage: 'getallcredit',
    async execute(msg, args) {
        if (msg.member.roles.has(msg.client.adminRoleID)) {
            var list = await msg.client.getAllCredit()
            console.log(list)
            var hasil = ""
            _.forEach(list, function(element) {
                hasil = `@${element.roleid.toString()}` + ' ' + element.credit.toString() + '\n'
            })
            msg.reply(hasil)
        } else msg.reply('you lack permission to do this operation.')
    }
};