module.exports = {
    name: 'gawr',
    description: 'gawr?',
    usage: 'gawr',
    execute(msg,args){
        msg.channel.send('a',
            {
                file: './assets/gawr.jpg'
            }
        )
    }
};