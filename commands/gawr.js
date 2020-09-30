module.exports = {
    name: 'gawr',
    execute(msg,args){
        msg.channel.send('a',
            {
                file: './Asset/gawr.jpg'
            }
        )
    }
};