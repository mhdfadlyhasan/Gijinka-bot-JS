const { isNull, isNumber, isInteger } = require("lodash");

module.exports = {
    name: 'cleanchan',
    description: 'Clean this channel, only for admins',
    usage: 'cleanchan',
    execute(msg, args) {
        if (msg.member.roles.has(msg.client.adminRoleID)) {
            [_, number_chat_delete] = args
            if(isNaN(parseInt(number_chat_delete))){
                msg.reply('Please input proper number!')
                return
            }
            if (number_chat_delete > 100) {
                msg.reply('too big!')
                return
            } 
                msg.channel.fetchMessages({
                    limit: number_chat_delete
                }).then(messages => {
                    messages.forEach(message => {
                        message.delete()
                    })
                })
        } else msg.reply('you lack permission to do this operation.')
    }
};