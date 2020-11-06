const uwufy = require('uwufy')
module.exports = {
    name: 'uwufy',
    description: 'uwu?',
    usage: 'uwufy [message]',
    execute(msg,args){
        var [_, ...toUwU] = args
        msg.delete(250)
        msg.channel.send(uwufy(toUwU.join(' ')))
    }
};
