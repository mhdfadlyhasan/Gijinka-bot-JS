module.exports = {
    name: 'chink',
    execute(msg,args){
          msg.channel.send('get chinked\nhttps://www.youtube.com/watch?v=kw9Z9ZSEHQQ',
          {
            file: './assets/tenor.gif'
          }
        )
      }
    };