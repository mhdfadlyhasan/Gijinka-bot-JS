module.exports = {
    name: 'voice',
    description: 'voice?',
    usage: 'voice',
    execute(msg,args){
        const channel = msg.client.channels.get("738015106830565468");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
          // Yay, it worked!
          console.log("Successfully connected.");
        }).catch(e => {
          // Oh no, it errored! Let's log it to console :)
          console.error(e);
        });
    }
};

