const uwufy = require('uwufy')
const mocking = require('@strdr4605/mockingcase')
module.exports = {
    name: 'mocking',
    description: 'carlo retard',
    usage: 'mocking [message]',
    execute(msg,args){
        var [_, ...toMocking] = args
        
        msg.channel.send(mocking(toMocking.join(' '), {random: true}))
    }
};
