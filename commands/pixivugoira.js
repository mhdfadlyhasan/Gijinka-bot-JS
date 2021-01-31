const axios = require('axios')
module.exports = {
    name: 'pixivugoira',
    description: 'Download ugoira from pixiv',
    execute(msg,args){
        //              0                      1                              2
        // args == [ 'pixiv', 'https://www.pixiv.net/en/artworks/84721311', 'gif' ]
        link = args[1]
        format = args[2]
        getMessage(msg,link,format)
    }
};

const getMessage = async (msg,link,format) =>{
    if(!validateFormat(msg,format)) return //check if format is gif or webm
    try{
        msg.channel.send('Please wait this could take a minute');
        //get file link from ugoira.dataprocessingclub.org
        
        link = encodeURIComponent(link)
        console.log(link)
        pesan = await axios.get(
            `http://ugoira.dataprocessingclub.org/convert?url=${link}`+
            `&format=${format}`
        )
        if(pesan.data.url == null){
            msg.channel.send(`failed to retrive ugoira,${pesan.data.error}`)
        }
        else msg.channel.send(pesan.data.url);

    }catch(error){
        msg.channel.send(`failed to retrive ugoira,${error}`)
    }
}
const validateFormat = (msg,format) => {

    if (format.toLowerCase()!='webm'&&format.toLowerCase()!='gif'){
        msg.channel.send('please specify correct format, gif or webm');
        return false
    }
    return true
}