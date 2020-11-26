const _ = require('lodash')

module.exports = {
    name: 'help',
    description: 'Show this page',
    usage: 'help',
    execute(msg, args) {
        var toSend = {
            embed: {
                author: {
                    name: msg.client.user.username,
                    icon_url: msg.client.user.avatarURL
                },
                color: 3447003,
                title: "**Help Page**",
                fields: []
            }
        }

        _.forEach([...msg.client.commands.values()], function(el){
            let command = {}
            command.name = `**${msg.client.prefix}${el.name}**`
            command.value = el.description + ((typeof el.usage !== 'undefined' && el.usage !== null) ?  `\n**Usage: \`${msg.client.prefix}${el.usage}\`**` : '')
            toSend.embed.fields.push(command)
        })
        msg.channel.send(toSend);
    }
}