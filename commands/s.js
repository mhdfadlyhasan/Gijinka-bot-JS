var gtts = require('node-gtts')('id');
var path = require('path');
module.exports = {
    name: 's',
    description: 'Text to Speech',
    usage: 's [message]',
    async execute(msg,args){
      var [_, ...pesan] = args
      if (!msg.guild) return;
      // Only try to join the sender's voice channel if they are in one themselves
      if (msg.member.voiceChannel) {
        var pesan = pesan.join("")
        const connection = msg.member.voiceChannel.join()
          .then(connection => {
            var filepath = path.join(__dirname, 'voice.wav');
            gtts.save(filepath, pesan , function() {
              const dispatcher = connection.playFile(filepath)
            })
        });
      } else {
        msg.reply('You need to join a voice channel first!');
      }
    }
};
