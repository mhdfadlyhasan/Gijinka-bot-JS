module.exports = {
    name: 'bruh',
    execute(msg,args){
        file_names = [
            'bruh1.jpg',
            'bruh2.jpg',
            'bruh3.jpg',
            'bruh4.jpg',
        ]
        console.info(file_names)
        msg.channel.send('Bruh',
            {
                file: `./assets/${file_names[Math.floor(Math.random() * file_names.length)]}`
            }
        )
    }
};
